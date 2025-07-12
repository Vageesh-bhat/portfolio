#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Portfolio Website
Tests all API endpoints with realistic data
"""

import requests
import json
import uuid
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE_URL = f"{BACKEND_URL}/api"

print(f"Testing backend at: {API_BASE_URL}")

class PortfolioAPITester:
    def __init__(self):
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name, success, details=""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details
        })
        
    def test_health_check(self):
        """Test the health check endpoint"""
        try:
            response = self.session.get(f"{API_BASE_URL}/")
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "version" in data:
                    self.log_test("Health Check", True, f"API running version {data.get('version')}")
                    return True
                else:
                    self.log_test("Health Check", False, "Missing required fields in response")
                    return False
            else:
                self.log_test("Health Check", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Health Check", False, f"Exception: {str(e)}")
            return False
    
    def test_portfolio_data_retrieval(self):
        """Test portfolio data retrieval (should return default data)"""
        try:
            response = self.session.get(f"{API_BASE_URL}/portfolio")
            if response.status_code == 200:
                data = response.json()
                required_sections = ['hero', 'about', 'skills', 'projects', 'education', 'experience', 'achievements', 'contact']
                
                missing_sections = [section for section in required_sections if section not in data]
                if not missing_sections:
                    # Verify default data structure
                    hero = data['hero']
                    if hero.get('name') == "Your Name Here" and hero.get('title') == "Computer Science Engineering Student":
                        self.log_test("Portfolio Data Retrieval", True, "Default portfolio data returned correctly")
                        return True
                    else:
                        self.log_test("Portfolio Data Retrieval", False, "Default data structure incorrect")
                        return False
                else:
                    self.log_test("Portfolio Data Retrieval", False, f"Missing sections: {missing_sections}")
                    return False
            else:
                self.log_test("Portfolio Data Retrieval", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Portfolio Data Retrieval", False, f"Exception: {str(e)}")
            return False
    
    def test_contact_form_submission(self):
        """Test contact form submission"""
        try:
            contact_data = {
                "name": "Arjun Sharma",
                "email": "arjun.sharma@example.com",
                "subject": "Internship Opportunity",
                "message": "Hi, I'm interested in discussing potential internship opportunities. I'm a final year CSE student with experience in full-stack development."
            }
            
            response = self.session.post(f"{API_BASE_URL}/contact/messages", json=contact_data)
            if response.status_code == 200:
                data = response.json()
                if data.get('name') == contact_data['name'] and data.get('email') == contact_data['email']:
                    self.log_test("Contact Form Submission", True, f"Message ID: {data.get('id')}")
                    return data.get('id')  # Return message ID for further tests
                else:
                    self.log_test("Contact Form Submission", False, "Response data doesn't match input")
                    return None
            else:
                self.log_test("Contact Form Submission", False, f"Status code: {response.status_code}, Response: {response.text}")
                return None
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Exception: {str(e)}")
            return None
    
    def test_get_contact_messages(self):
        """Test retrieving all contact messages"""
        try:
            response = self.session.get(f"{API_BASE_URL}/contact/messages")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Contact Messages", True, f"Retrieved {len(data)} messages")
                    return True
                else:
                    self.log_test("Get Contact Messages", False, "Response is not a list")
                    return False
            else:
                self.log_test("Get Contact Messages", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get Contact Messages", False, f"Exception: {str(e)}")
            return False
    
    def test_contact_stats(self):
        """Test contact statistics endpoint"""
        try:
            response = self.session.get(f"{API_BASE_URL}/contact/stats")
            if response.status_code == 200:
                data = response.json()
                required_fields = ['total_messages', 'new_messages', 'read_messages', 'replied_messages']
                if all(field in data for field in required_fields):
                    self.log_test("Contact Statistics", True, f"Total messages: {data['total_messages']}")
                    return True
                else:
                    self.log_test("Contact Statistics", False, "Missing required statistics fields")
                    return False
            else:
                self.log_test("Contact Statistics", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Contact Statistics", False, f"Exception: {str(e)}")
            return False
    
    def test_create_project(self):
        """Test creating a new project"""
        try:
            project_data = {
                "title": "E-Commerce Web Application",
                "description": "A full-stack e-commerce platform built with React and Node.js, featuring user authentication, product catalog, shopping cart, and payment integration.",
                "technologies": ["React", "Node.js", "MongoDB", "Express", "Stripe API", "JWT"],
                "github_url": "https://github.com/arjunsharma/ecommerce-app",
                "live_url": "https://ecommerce-demo.herokuapp.com",
                "image_url": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
                "featured": True
            }
            
            response = self.session.post(f"{API_BASE_URL}/portfolio/projects", json=project_data)
            if response.status_code == 200:
                data = response.json()
                if data.get('title') == project_data['title'] and data.get('featured') == True:
                    self.log_test("Create Project", True, f"Project ID: {data.get('id')}")
                    return data.get('id')
                else:
                    self.log_test("Create Project", False, "Response data doesn't match input")
                    return None
            else:
                self.log_test("Create Project", False, f"Status code: {response.status_code}, Response: {response.text}")
                return None
        except Exception as e:
            self.log_test("Create Project", False, f"Exception: {str(e)}")
            return None
    
    def test_get_projects(self):
        """Test retrieving all projects"""
        try:
            response = self.session.get(f"{API_BASE_URL}/portfolio/projects")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Projects", True, f"Retrieved {len(data)} projects")
                    return True
                else:
                    self.log_test("Get Projects", False, "Response is not a list")
                    return False
            else:
                self.log_test("Get Projects", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get Projects", False, f"Exception: {str(e)}")
            return False
    
    def test_create_education(self):
        """Test creating education entry"""
        try:
            education_data = {
                "degree": "Bachelor of Technology",
                "field": "Computer Science Engineering",
                "institution": "Indian Institute of Technology Delhi",
                "location": "New Delhi, India",
                "duration": "2021 - 2025",
                "cgpa": "8.7",
                "description": "Relevant coursework: Data Structures & Algorithms, Database Management Systems, Software Engineering, Machine Learning, Computer Networks, Operating Systems"
            }
            
            response = self.session.post(f"{API_BASE_URL}/portfolio/education", json=education_data)
            if response.status_code == 200:
                data = response.json()
                if data.get('degree') == education_data['degree'] and data.get('institution') == education_data['institution']:
                    self.log_test("Create Education", True, f"Education ID: {data.get('id')}")
                    return data.get('id')
                else:
                    self.log_test("Create Education", False, "Response data doesn't match input")
                    return None
            else:
                self.log_test("Create Education", False, f"Status code: {response.status_code}, Response: {response.text}")
                return None
        except Exception as e:
            self.log_test("Create Education", False, f"Exception: {str(e)}")
            return None
    
    def test_create_experience(self):
        """Test creating experience entry"""
        try:
            experience_data = {
                "position": "Software Development Intern",
                "company": "TechCorp Solutions",
                "location": "Bangalore, India",
                "duration": "June 2024 - August 2024",
                "type": "Internship",
                "description": "Worked on developing REST APIs and frontend components for the company's main product.",
                "achievements": [
                    "Improved API response time by 30%",
                    "Implemented user authentication system",
                    "Collaborated with a team of 5 developers"
                ]
            }
            
            response = self.session.post(f"{API_BASE_URL}/portfolio/experience", json=experience_data)
            if response.status_code == 200:
                data = response.json()
                if data.get('position') == experience_data['position'] and data.get('company') == experience_data['company']:
                    self.log_test("Create Experience", True, f"Experience ID: {data.get('id')}")
                    return data.get('id')
                else:
                    self.log_test("Create Experience", False, "Response data doesn't match input")
                    return None
            else:
                self.log_test("Create Experience", False, f"Status code: {response.status_code}, Response: {response.text}")
                return None
        except Exception as e:
            self.log_test("Create Experience", False, f"Exception: {str(e)}")
            return None
    
    def test_create_achievement(self):
        """Test creating achievement entry"""
        try:
            achievement_data = {
                "title": "Winner - Smart India Hackathon 2024",
                "description": "Led a team of 6 to develop an AI-powered solution for traffic management, winning the national level hackathon.",
                "date": "March 2024",
                "type": "Competition"
            }
            
            response = self.session.post(f"{API_BASE_URL}/portfolio/achievements", json=achievement_data)
            if response.status_code == 200:
                data = response.json()
                if data.get('title') == achievement_data['title'] and data.get('type') == achievement_data['type']:
                    self.log_test("Create Achievement", True, f"Achievement ID: {data.get('id')}")
                    return data.get('id')
                else:
                    self.log_test("Create Achievement", False, "Response data doesn't match input")
                    return None
            else:
                self.log_test("Create Achievement", False, f"Status code: {response.status_code}, Response: {response.text}")
                return None
        except Exception as e:
            self.log_test("Create Achievement", False, f"Exception: {str(e)}")
            return None
    
    def test_update_hero_section(self):
        """Test updating hero section"""
        try:
            hero_data = {
                "id": str(uuid.uuid4()),
                "name": "Arjun Kumar Sharma",
                "title": "Computer Science Engineering Student",
                "subtitle": "Full Stack Developer | Machine Learning Enthusiast | Open Source Contributor",
                "description": "Passionate about building scalable web applications and exploring the intersection of technology and innovation.",
                "resume_url": "https://drive.google.com/file/d/sample-resume-link",
                "social_links": {
                    "github": "https://github.com/arjunkumar",
                    "linkedin": "https://linkedin.com/in/arjunkumar",
                    "twitter": "https://twitter.com/arjunkumar",
                    "email": "arjun.kumar@example.com"
                }
            }
            
            response = self.session.put(f"{API_BASE_URL}/portfolio/hero", json=hero_data)
            if response.status_code == 200:
                data = response.json()
                if data.get('name') == hero_data['name'] and data.get('title') == hero_data['title']:
                    self.log_test("Update Hero Section", True, f"Hero updated for: {data.get('name')}")
                    return True
                else:
                    self.log_test("Update Hero Section", False, "Response data doesn't match input")
                    return False
            else:
                self.log_test("Update Hero Section", False, f"Status code: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("Update Hero Section", False, f"Exception: {str(e)}")
            return False
    
    def test_error_handling(self):
        """Test error handling with invalid data"""
        try:
            # Test invalid contact form data (missing required fields)
            invalid_contact = {
                "name": "Test User"
                # Missing email, subject, message
            }
            
            response = self.session.post(f"{API_BASE_URL}/contact/messages", json=invalid_contact)
            if response.status_code in [400, 422]:  # Bad Request or Unprocessable Entity
                self.log_test("Error Handling - Invalid Contact Data", True, f"Correctly rejected invalid data with status {response.status_code}")
                return True
            else:
                self.log_test("Error Handling - Invalid Contact Data", False, f"Expected 400/422, got {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Error Handling - Invalid Contact Data", False, f"Exception: {str(e)}")
            return False
    
    def test_database_connectivity(self):
        """Test database connectivity by performing CRUD operations"""
        try:
            # Create a test project
            test_project = {
                "title": "Database Test Project",
                "description": "Testing database connectivity",
                "technologies": ["Python", "MongoDB"],
                "featured": False
            }
            
            # Create
            create_response = self.session.post(f"{API_BASE_URL}/portfolio/projects", json=test_project)
            if create_response.status_code != 200:
                self.log_test("Database Connectivity", False, f"Failed to create test project: {create_response.status_code}")
                return False
            
            project_id = create_response.json().get('id')
            
            # Read
            read_response = self.session.get(f"{API_BASE_URL}/portfolio/projects")
            if read_response.status_code != 200:
                self.log_test("Database Connectivity", False, f"Failed to read projects: {read_response.status_code}")
                return False
            
            projects = read_response.json()
            test_project_found = any(p.get('id') == project_id for p in projects)
            
            if test_project_found:
                self.log_test("Database Connectivity", True, "CRUD operations working correctly")
                return True
            else:
                self.log_test("Database Connectivity", False, "Created project not found in database")
                return False
                
        except Exception as e:
            self.log_test("Database Connectivity", False, f"Exception: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print("=" * 60)
        print("PORTFOLIO BACKEND API COMPREHENSIVE TESTING")
        print("=" * 60)
        
        tests = [
            self.test_health_check,
            self.test_portfolio_data_retrieval,
            self.test_contact_form_submission,
            self.test_get_contact_messages,
            self.test_contact_stats,
            self.test_create_project,
            self.test_get_projects,
            self.test_create_education,
            self.test_create_experience,
            self.test_create_achievement,
            self.test_update_hero_section,
            self.test_error_handling,
            self.test_database_connectivity
        ]
        
        passed = 0
        total = len(tests)
        
        for test in tests:
            result = test()
            if result:
                passed += 1
            print()  # Add spacing between tests
        
        print("=" * 60)
        print(f"TEST SUMMARY: {passed}/{total} tests passed")
        print("=" * 60)
        
        if passed == total:
            print("🎉 ALL TESTS PASSED! Backend API is working correctly.")
        else:
            print(f"⚠️  {total - passed} tests failed. Please check the issues above.")
        
        return passed == total

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    exit(0 if success else 1)