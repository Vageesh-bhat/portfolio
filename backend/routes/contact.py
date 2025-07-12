from fastapi import APIRouter, HTTPException
from typing import List
from models import ContactMessage, ContactMessageCreate
from database import get_database
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/contact/messages", response_model=ContactMessage)
async def create_contact_message(message_data: ContactMessageCreate):
    """Submit a contact form message"""
    try:
        db = get_database()
        message = ContactMessage(**message_data.dict())
        message_dict = message.dict()
        
        result = await db.contact_messages.insert_one(message_dict)
        
        if result.acknowledged:
            logger.info(f"New contact message from {message.email}: {message.subject}")
            return message
        else:
            raise HTTPException(status_code=500, detail="Failed to submit contact message")
            
    except Exception as e:
        logger.error(f"Error creating contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact message")

@router.get("/contact/messages", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (admin only)"""
    try:
        db = get_database()
        messages = await db.contact_messages.find().sort("created_at", -1).to_list(100)
        return [ContactMessage(**message) for message in messages]
        
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact messages")

@router.get("/contact/messages/{message_id}", response_model=ContactMessage)
async def get_contact_message(message_id: str):
    """Get a specific contact message"""
    try:
        db = get_database()
        message = await db.contact_messages.find_one({"id": message_id})
        
        if not message:
            raise HTTPException(status_code=404, detail="Message not found")
        
        return ContactMessage(**message)
        
    except Exception as e:
        logger.error(f"Error fetching contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact message")

@router.put("/contact/messages/{message_id}/status")
async def update_message_status(message_id: str, status: str):
    """Update message status (new, read, replied)"""
    try:
        db = get_database()
        
        valid_statuses = ["new", "read", "replied"]
        if status not in valid_statuses:
            raise HTTPException(status_code=400, detail="Invalid status")
        
        result = await db.contact_messages.update_one(
            {"id": message_id},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Message not found")
        
        return {"message": "Status updated successfully"}
        
    except Exception as e:
        logger.error(f"Error updating message status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update message status")

@router.delete("/contact/messages/{message_id}")
async def delete_contact_message(message_id: str):
    """Delete a contact message"""
    try:
        db = get_database()
        
        result = await db.contact_messages.delete_one({"id": message_id})
        
        if result.deleted_count == 1:
            return {"message": "Contact message deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Message not found")
            
    except Exception as e:
        logger.error(f"Error deleting contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete contact message")

@router.get("/contact/stats")
async def get_contact_stats():
    """Get contact message statistics"""
    try:
        db = get_database()
        
        total_messages = await db.contact_messages.count_documents({})
        new_messages = await db.contact_messages.count_documents({"status": "new"})
        read_messages = await db.contact_messages.count_documents({"status": "read"})
        replied_messages = await db.contact_messages.count_documents({"status": "replied"})
        
        return {
            "total_messages": total_messages,
            "new_messages": new_messages,
            "read_messages": read_messages,
            "replied_messages": replied_messages
        }
        
    except Exception as e:
        logger.error(f"Error fetching contact stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact statistics")