export const mockData = {
  hero: {
    name: "Vageesh Bhat",
    title: "Computer Science Engineering Student",
    subtitle: "Full Stack Developer | AI Enthusiast | Problem Solver",
    description: "Passionate about creating innovative solutions through code. Currently pursuing my degree in Computer Science Engineering with a focus on modern web technologies and artificial intelligence.",
    resumeUrl: "#", // Add your resume URL here
    socialLinks: {
      github: "https://github.com/Vageesh-bhat",
      linkedin: "https://linkedin.com/in/vageesh-bhat",
      // twitter: "https://twitter.com/yourusername",
      email: "vageeshbhat2003@gmail.com"
    }
  },
  about: {
    title: "About Me",
    description: "I'm a passionate Computer Science Engineering student with a strong foundation in software development and a keen interest in emerging technologies. My journey in tech started with curiosity about how things work, and has evolved into a deep passion for creating solutions that make a difference.",
    highlights: [
      "🎓 Currently pursuing B.Tech in Computer Science Engineering",
      "💻 2+ years of programming experience",
      "🚀 Built 3+ projects using modern technologies",
      // "🏆 Active participant in coding competitions",
      "🌱 Always learning new technologies and frameworks"
    ],
    imageUrl: "https://i.postimg.cc/zGq290Kj/IMG-20250714-WA0070-1.jpg"
  },
  skills: {
    title: "Technical Skills",
    categories: [
      {
        name: "Programming Languages",
        skills: ["JavaScript", "Python", "Java", "C++", "C", "SQL"]
      },
      {
        name: "Frontend Development",
        skills: ["React", "HTML5", "CSS", "Tailwind CSS"]
      },
      {
        name: "Backend Development",
        skills: ["Node.js", "Express.js", "Flask", "MongoDB", "Xampp"]
      },
      {
        name: "Tools & Technologies",
        skills: ["Git","GitHub","Microsoft Azure", "Docker", "Postman", "VS Code"]
      },
      {
        name: "Soft Skills",
        skills: ["Problem Solving", "Team Leadership", "Communication", "Project Management"]
      }
    ]
  },
  projects: [
    {
      id: 1,
      title: "Canteen Management",
      description: "Developed a real-time canteen management system with online ordering, QR-based token redemption, and admin dashboards.",
      technologies: ["React.js", "Node.js", "MongoDB", "Express.js"],
      githubUrl: "https://github.com/Vageesh-bhat/canteenManagement.git",
      liveUrl: "https://nishcanteen.netlify.app/",
      imageUrl: "https://www.bing.com/th/id/OIP.H9VRN_1VQP1j9QEIP2YW7QHaE0?w=245&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
    },
    {
      id: 2,
      title: "Trogen-image Detection",
      description: "Built an AI-powered image scanner using TensorFlow and OpenCV to detect Trojan code via a Flask-based web interface.",
      technologies: ["Python", "TensorFlow", "Flask", "OpenCV"],
      githubUrl: "https://github.com/Vageesh-bhat/Trojan-image-detection.git",
      liveUrl: "https://trogen-image.com",
      imageUrl: "https://www.jvrconsultancy.com/wp-content/uploads/2020/10/AdobeStock_271386043_200px.jpg"
    },
    {
      id: 3,
      title: "House-Rental System",
      description: "Created a dynamic property rental platform with user authentication, booking system, and admin dashboard.",
      technologies: ["PHP", "MySQL", "XAMPP", "HTML", "CSS"],
      githubUrl: "https://github.com/Vageesh-bhat/house-rental-flatform.git",
      liveUrl: "https://github.com/Vageesh-bhat/house-rental-flatform.git",
      imageUrl: "https://www.sourcecodester.com/sites/default/files/2020-10/images/house_rental.png"
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Engineering",
      field: "Computer Science Engineering",
      institution: "Sahyadri College Of Engineering and Management",
      location: "Mangalore, Karnataka",
      duration: "2022 - 2026",
      cgpa: "7.5/10",
      description: "Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering, Machine Learning, Web Development"
    },
    {
      id: 2,
      degree: "Higher Secondary Certificate",
      field: "Science (PCMC)",
      institution: "SDPT PU College Kateel",
      location: "Mangalore, karnataka",
      duration: "2019 - 2021",
      percentage: "75%",
      description: "Focused on Mathematics, Physics, and Chemistry with additional computer science courses"
    }
  ],
  // experience: [
  //   {
  //     id: 1,
  //     position: "Software Development Intern",
  //     company: "Your Company Name",
  //     location: "City, State",
  //     duration: "June 2024 - August 2024",
  //     type: "Internship",
  //     description: "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
  //     achievements: [
  //       "Improved application performance by 30%",
  //       "Implemented responsive design for mobile compatibility",
  //       "Contributed to code review process and documentation"
  //     ]
  //   },
  //   {
  //     id: 2,
  //     position: "Technical Team Lead",
  //     company: "University Tech Club",
  //     location: "University Campus",
  //     duration: "January 2023 - Present",
  //     type: "Leadership",
  //     description: "Leading a team of 15 students in organizing technical events and workshops. Managed multiple projects and mentored junior students.",
  //     achievements: [
  //       "Organized 5+ technical workshops",
  //       "Managed team of 15 members",
  //       "Increased club membership by 40%"
  //     ]
  //   }
  // ],
  achievements: [
    {
      id: 1,
      title: "Winner - University Hackathon 2024",
      description: "Won first place in the annual university hackathon with an innovative AI-powered solution for sustainable energy management.",
      date: "March 2024",
      type: "Competition"
    },
    {
      id: 2,
      title: "Google Code Jam Participant",
      description: "Qualified for Google Code Jam 2024 and ranked in top 500 participants globally.",
      date: "April 2024",
      type: "Competition"
    },
    {
      id: 3,
      title: "Dean's List",
      description: "Achieved Dean's List recognition for academic excellence with CGPA above 9.0.",
      date: "December 2023",
      type: "Academic"
    },
    {
      id: 4,
      title: "AWS Cloud Practitioner Certified",
      description: "Successfully completed AWS Cloud Practitioner certification demonstrating cloud computing knowledge.",
      date: "August 2023",
      type: "Certification"
    }
  ],
  contact: {
    title: "Get In Touch",
    description: "I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology. Feel free to reach out!",
    email: "vageeshbhat2003@gmail.com",
    phone: "+91 8296139793",
    location: "Mangalore, Karnataka, India",
    socialLinks: {
      github: "https://github.com/Vageesh-bhat",
      linkedin: "https://linkedin.com/in/vageesh-bhat",
      // twitter: "https://twitter.com/yourusername",
      instagram: "https://instagram.com/vageesshhh"
    }
  }
};