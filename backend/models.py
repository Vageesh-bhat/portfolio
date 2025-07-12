from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict
from datetime import datetime
import uuid

# Contact Form Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"  # new, read, replied

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

# Portfolio Data Models
class SocialLinks(BaseModel):
    github: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None
    instagram: Optional[str] = None
    email: Optional[str] = None

class HeroSection(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    subtitle: str
    description: str
    resume_url: Optional[str] = None
    social_links: SocialLinks
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class AboutSection(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    highlights: List[str]
    image_url: Optional[str] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class SkillCategory(BaseModel):
    name: str
    skills: List[str]

class SkillsSection(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    categories: List[SkillCategory]
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False

class Education(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    degree: str
    field: str
    institution: str
    location: str
    duration: str
    cgpa: Optional[str] = None
    percentage: Optional[str] = None
    description: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class EducationCreate(BaseModel):
    degree: str
    field: str
    institution: str
    location: str
    duration: str
    cgpa: Optional[str] = None
    percentage: Optional[str] = None
    description: str

class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    position: str
    company: str
    location: str
    duration: str
    type: str  # Internship, Full-time, Leadership, etc.
    description: str
    achievements: Optional[List[str]] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ExperienceCreate(BaseModel):
    position: str
    company: str
    location: str
    duration: str
    type: str
    description: str
    achievements: Optional[List[str]] = None

class Achievement(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    date: str
    type: str  # Competition, Academic, Certification, etc.
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AchievementCreate(BaseModel):
    title: str
    description: str
    date: str
    type: str

class ContactInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    email: EmailStr
    phone: str
    location: str
    social_links: SocialLinks
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Portfolio Summary Model
class PortfolioData(BaseModel):
    hero: HeroSection
    about: AboutSection
    skills: SkillsSection
    projects: List[Project]
    education: List[Education]
    experience: List[Experience]
    achievements: List[Achievement]
    contact: ContactInfo