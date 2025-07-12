from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'portfolio_db')]

def get_database():
    """Get database instance"""
    return db

async def init_database():
    """Initialize database with indexes"""
    try:
        # Create indexes for better performance
        await db.contact_messages.create_index("created_at")
        await db.contact_messages.create_index("status")
        await db.contact_messages.create_index("email")
        
        await db.projects.create_index("created_at")
        await db.projects.create_index("featured")
        
        await db.education.create_index("created_at")
        await db.experience.create_index("created_at")
        await db.achievements.create_index("created_at")
        
        print("Database initialized successfully")
        
    except Exception as e:
        print(f"Error initializing database: {str(e)}")

async def close_database():
    """Close database connection"""
    client.close()