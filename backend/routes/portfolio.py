from fastapi import APIRouter, HTTPException
from typing import List
from models import (
    HeroSection, AboutSection, SkillsSection, Project, ProjectCreate,
    Education, EducationCreate, Experience, ExperienceCreate,
    Achievement, AchievementCreate, ContactInfo, PortfolioData
)
from database import get_database
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/portfolio", response_model=PortfolioData)
async def get_portfolio():
    """Get complete portfolio data"""
    try:
        db = get_database()
        
        # Get all portfolio sections
        hero = await db.hero.find_one()
        about = await db.about.find_one()
        skills = await db.skills.find_one()
        projects = await db.projects.find({"featured": True}).to_list(10)
        education = await db.education.find().sort("created_at", -1).to_list(10)
        experience = await db.experience.find().sort("created_at", -1).to_list(10)
        achievements = await db.achievements.find().sort("created_at", -1).to_list(10)
        contact = await db.contact.find_one()
        
        # Create default data if not exists
        if not hero:
            hero = {
                "name": "Your Name Here",
                "title": "Computer Science Engineering Student",
                "subtitle": "Full Stack Developer | AI Enthusiast | Problem Solver",
                "description": "Passionate about creating innovative solutions through code.",
                "resume_url": "#",
                "social_links": {
                    "github": "https://github.com/yourusername",
                    "linkedin": "https://linkedin.com/in/yourusername",
                    "twitter": "https://twitter.com/yourusername",
                    "email": "your.email@example.com"
                }
            }
        
        if not about:
            about = {
                "title": "About Me",
                "description": "I'm a passionate Computer Science Engineering student with a strong foundation in software development.",
                "highlights": [
                    "🎓 Currently pursuing B.Tech in Computer Science Engineering",
                    "💻 3+ years of programming experience",
                    "🚀 Built 10+ projects using modern technologies"
                ],
                "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
            }
        
        if not skills:
            skills = {
                "title": "Technical Skills",
                "categories": [
                    {
                        "name": "Programming Languages",
                        "skills": ["JavaScript", "Python", "Java", "C++", "TypeScript", "SQL"]
                    },
                    {
                        "name": "Frontend Development",
                        "skills": ["React", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"]
                    }
                ]
            }
        
        if not contact:
            contact = {
                "title": "Get In Touch",
                "description": "I'm always open to discussing new opportunities.",
                "email": "your.email@example.com",
                "phone": "+91 XXXXX XXXXX",
                "location": "City, State, India",
                "social_links": {
                    "github": "https://github.com/yourusername",
                    "linkedin": "https://linkedin.com/in/yourusername",
                    "twitter": "https://twitter.com/yourusername",
                    "instagram": "https://instagram.com/yourusername"
                }
            }
        
        return PortfolioData(
            hero=HeroSection(**hero),
            about=AboutSection(**about),
            skills=SkillsSection(**skills),
            projects=[Project(**project) for project in projects],
            education=[Education(**edu) for edu in education],
            experience=[Experience(**exp) for exp in experience],
            achievements=[Achievement(**ach) for ach in achievements],
            contact=ContactInfo(**contact)
        )
        
    except Exception as e:
        logger.error(f"Error fetching portfolio data: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch portfolio data")

@router.put("/portfolio/hero", response_model=HeroSection)
async def update_hero(hero_data: HeroSection):
    """Update hero section"""
    try:
        db = get_database()
        hero_dict = hero_data.dict()
        
        result = await db.hero.replace_one(
            {"id": hero_data.id},
            hero_dict,
            upsert=True
        )
        
        if result.acknowledged:
            return hero_data
        else:
            raise HTTPException(status_code=500, detail="Failed to update hero section")
            
    except Exception as e:
        logger.error(f"Error updating hero section: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update hero section")

@router.put("/portfolio/about", response_model=AboutSection)
async def update_about(about_data: AboutSection):
    """Update about section"""
    try:
        db = get_database()
        about_dict = about_data.dict()
        
        result = await db.about.replace_one(
            {"id": about_data.id},
            about_dict,
            upsert=True
        )
        
        if result.acknowledged:
            return about_data
        else:
            raise HTTPException(status_code=500, detail="Failed to update about section")
            
    except Exception as e:
        logger.error(f"Error updating about section: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update about section")

@router.put("/portfolio/skills", response_model=SkillsSection)
async def update_skills(skills_data: SkillsSection):
    """Update skills section"""
    try:
        db = get_database()
        skills_dict = skills_data.dict()
        
        result = await db.skills.replace_one(
            {"id": skills_data.id},
            skills_dict,
            upsert=True
        )
        
        if result.acknowledged:
            return skills_data
        else:
            raise HTTPException(status_code=500, detail="Failed to update skills section")
            
    except Exception as e:
        logger.error(f"Error updating skills section: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update skills section")

@router.post("/portfolio/projects", response_model=Project)
async def create_project(project_data: ProjectCreate):
    """Create a new project"""
    try:
        db = get_database()
        project = Project(**project_data.dict())
        project_dict = project.dict()
        
        result = await db.projects.insert_one(project_dict)
        
        if result.acknowledged:
            return project
        else:
            raise HTTPException(status_code=500, detail="Failed to create project")
            
    except Exception as e:
        logger.error(f"Error creating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create project")

@router.get("/portfolio/projects", response_model=List[Project])
async def get_projects():
    """Get all projects"""
    try:
        db = get_database()
        projects = await db.projects.find().sort("created_at", -1).to_list(100)
        return [Project(**project) for project in projects]
        
    except Exception as e:
        logger.error(f"Error fetching projects: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch projects")

@router.put("/portfolio/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project_data: ProjectCreate):
    """Update a project"""
    try:
        db = get_database()
        
        existing_project = await db.projects.find_one({"id": project_id})
        if not existing_project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        updated_project = Project(id=project_id, **project_data.dict())
        project_dict = updated_project.dict()
        
        result = await db.projects.replace_one(
            {"id": project_id},
            project_dict
        )
        
        if result.acknowledged:
            return updated_project
        else:
            raise HTTPException(status_code=500, detail="Failed to update project")
            
    except Exception as e:
        logger.error(f"Error updating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update project")

@router.delete("/portfolio/projects/{project_id}")
async def delete_project(project_id: str):
    """Delete a project"""
    try:
        db = get_database()
        
        result = await db.projects.delete_one({"id": project_id})
        
        if result.deleted_count == 1:
            return {"message": "Project deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Project not found")
            
    except Exception as e:
        logger.error(f"Error deleting project: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete project")

@router.post("/portfolio/education", response_model=Education)
async def create_education(education_data: EducationCreate):
    """Create education entry"""
    try:
        db = get_database()
        education = Education(**education_data.dict())
        education_dict = education.dict()
        
        result = await db.education.insert_one(education_dict)
        
        if result.acknowledged:
            return education
        else:
            raise HTTPException(status_code=500, detail="Failed to create education entry")
            
    except Exception as e:
        logger.error(f"Error creating education entry: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create education entry")

@router.get("/portfolio/education", response_model=List[Education])
async def get_education():
    """Get all education entries"""
    try:
        db = get_database()
        education = await db.education.find().sort("created_at", -1).to_list(100)
        return [Education(**edu) for edu in education]
        
    except Exception as e:
        logger.error(f"Error fetching education: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch education")

@router.post("/portfolio/experience", response_model=Experience)
async def create_experience(experience_data: ExperienceCreate):
    """Create experience entry"""
    try:
        db = get_database()
        experience = Experience(**experience_data.dict())
        experience_dict = experience.dict()
        
        result = await db.experience.insert_one(experience_dict)
        
        if result.acknowledged:
            return experience
        else:
            raise HTTPException(status_code=500, detail="Failed to create experience entry")
            
    except Exception as e:
        logger.error(f"Error creating experience entry: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create experience entry")

@router.get("/portfolio/experience", response_model=List[Experience])
async def get_experience():
    """Get all experience entries"""
    try:
        db = get_database()
        experience = await db.experience.find().sort("created_at", -1).to_list(100)
        return [Experience(**exp) for exp in experience]
        
    except Exception as e:
        logger.error(f"Error fetching experience: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch experience")

@router.post("/portfolio/achievements", response_model=Achievement)
async def create_achievement(achievement_data: AchievementCreate):
    """Create achievement entry"""
    try:
        db = get_database()
        achievement = Achievement(**achievement_data.dict())
        achievement_dict = achievement.dict()
        
        result = await db.achievements.insert_one(achievement_dict)
        
        if result.acknowledged:
            return achievement
        else:
            raise HTTPException(status_code=500, detail="Failed to create achievement entry")
            
    except Exception as e:
        logger.error(f"Error creating achievement entry: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create achievement entry")

@router.get("/portfolio/achievements", response_model=List[Achievement])
async def get_achievements():
    """Get all achievements"""
    try:
        db = get_database()
        achievements = await db.achievements.find().sort("created_at", -1).to_list(100)
        return [Achievement(**ach) for ach in achievements]
        
    except Exception as e:
        logger.error(f"Error fetching achievements: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch achievements")

@router.put("/portfolio/contact", response_model=ContactInfo)
async def update_contact(contact_data: ContactInfo):
    """Update contact information"""
    try:
        db = get_database()
        contact_dict = contact_data.dict()
        
        result = await db.contact.replace_one(
            {"id": contact_data.id},
            contact_dict,
            upsert=True
        )
        
        if result.acknowledged:
            return contact_data
        else:
            raise HTTPException(status_code=500, detail="Failed to update contact information")
            
    except Exception as e:
        logger.error(f"Error updating contact information: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update contact information")