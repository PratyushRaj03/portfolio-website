export const projectsData = [
  {
    id: "project-outlet-nav",
    title: "Outlet Intelligence & Traffic-Aware Navigation System",
    subtitle: "Geospatial Analytics & Real-Time Routing",
    description: "A geospatial web application built to visualize and navigate across 4,000+ retail outlet locations from a structured location database with automatic customer clustering, real-time tracking, and traffic-aware routing.",
    features: [
      "Interactive visualization & marker clustering for 4,000+ outlet locations",
      "Automatic customer-based color assignment & multi-attribute filtering",
      "Real-time location tracking with dynamic ETA, distance & alternative routes",
      "Traffic-aware road routing with automatic recalculation on deviation",
      "Non-intrusive navigation overlay maintaining full visibility of the outlet network"
    ],
    calloutTitle: "Engineering Focus",
    calloutText: "Combines large-scale geospatial data visualization with real-time navigation directly on top of the live outlet intelligence map without separate screens.",
    tech: ["HTML", "CSS", "JavaScript", "Geospatial APIs", "Routing APIs", "Geolocation API"],
    github: "https://github.com/PratyushRaj03",
    demo: "https://github.com/PratyushRaj03",
    image: "assets/images/outlet_nav_preview.svg"
  },
  {
    id: "project-bottle-detection",
    title: "Bottle Detection & Classification",
    subtitle: "Custom YOLO Model & Deep Learning Pipeline",
    description: "An end-to-end computer vision system for detecting and classifying bottles in images using a custom-trained YOLO model with transfer learning and local PyTorch/Ultralytics training.",
    features: [
      "Custom bottle image dataset & standardized YOLO-format annotations",
      "Transfer learning applied from pretrained YOLO backbone via PyTorch",
      "Multi-class bounding box detection with high-confidence class prediction",
      "Model evaluation using standard metrics including precision, recall, and mAP",
      "Selected best-performing checkpoint saved for low-latency inference"
    ],
    calloutTitle: "Pipeline Workflow",
    calloutText: "Dataset Preparation → Annotation → Training → Validation → Evaluation → Model Selection → Inference",
    tech: ["Python", "YOLO", "Ultralytics", "PyTorch", "OpenCV", "Computer Vision", "Deep Learning"],
    github: "https://github.com/PratyushRaj03",
    demo: "https://github.com/PratyushRaj03",
    image: "assets/images/bottle_preview.svg"
  }
];

export const skillsData = {
  cv: [
    { name: "Computer Vision" },
    { name: "YOLO (Ultralytics)" },
    { name: "OpenCV" },
    { name: "Object Detection" },
    { name: "Bounding-Box Detection" },
    { name: "Dataset Preparation & Annotation" }
  ],
  ml: [
    { name: "Python" },
    { name: "PyTorch" },
    { name: "Deep Learning" },
    { name: "Transfer Learning" },
    { name: "Model Training & Validation" },
    { name: "Evaluation (mAP, Precision, Recall)" }
  ],
  frontend: [
    { name: "JavaScript (ES6+)" },
    { name: "HTML5" },
    { name: "CSS3" },
    { name: "Geospatial & Mapping APIs" },
    { name: "Traffic-Aware Routing APIs" },
    { name: "Browser Geolocation API" },
    { name: "Marker Clustering & Overlays" }
  ],
  backend: [
    { name: "Python" },
    { name: "Node.js" },
    { name: "Express" },
    { name: "RESTful APIs" },
    { name: "JSON Data Processing" }
  ],
  databases: [
    { name: "Structured Location Databases" },
    { name: "Spatial & Attribute Filtering" },
    { name: "MongoDB" },
    { name: "MySQL" }
  ],
  tools: [
    { name: "Git" },
    { name: "GitHub" },
    { name: "VS Code" },
    { name: "Postman" }
  ]
};

export const timelineData = [
  {
    type: "education",
    year: "2023 - Present",
    title: "B.Tech in Computer Science Engineering (AI & ML)",
    organization: "K.R. Mangalam University",
    description: "Pursuing specialization in Artificial Intelligence and Machine Learning. Building foundational skills in advanced algorithms, neural networks, and computer vision systems.",
    badges: ["Academic Foundation", "AI & ML Specialization"]
  },
  {
    type: "achievement",
    year: "2024",
    title: "Developed Outlet Intelligence & Traffic-Aware Navigation System",
    organization: "Flagship Geospatial Project",
    description: "Architected a geospatial web application visualizing 4,000+ retail outlet locations with dynamic customer clustering, real-time tracking, and traffic-aware road routing directly on live map intelligence.",
    badges: ["Geospatial AI", "Real-Time Routing", "Cluster Visualization"]
  },
  {
    type: "achievement",
    year: "2024",
    title: "Built Bottle Detection & Classification System",
    organization: "Computer Vision & Deep Learning",
    description: "Developed an end-to-end computer vision pipeline using custom annotated datasets, transfer learning on YOLO backbones, and local PyTorch training evaluated with precision, recall, and mAP metrics.",
    badges: ["YOLO", "Computer Vision", "PyTorch"]
  },
  {
    type: "work",
    year: "2023",
    title: "Started Artificial Intelligence & Computer Vision",
    organization: "Self-Driven Learning",
    description: "Deep-dived into AI/ML frameworks. Focused on object detection, image classification, and tracking using YOLOv8, PyTorch, and OpenCV.",
    badges: ["Deep Learning", "YOLOv8", "OpenCV"]
  },
  {
    type: "work",
    year: "2022",
    title: "Built Full Stack & System Projects",
    organization: "Practical Applications",
    description: "Developed end-to-end web applications, including responsive websites, location tools, and database-driven portals.",
    badges: ["Backend Integration", "Database Design"]
  },
  {
    type: "education",
    year: "2021",
    title: "Learned Web Development",
    organization: "Self-Driven Learning",
    description: "Mastered core web technologies (HTML, CSS, JavaScript) to construct responsive, interactive user interfaces and web systems.",
    badges: ["Frontend Basics", "JavaScript ES6+"]
  },
  {
    type: "education",
    year: "2020",
    title: "Started Programming",
    organization: "First Code",
    description: "Began journey in software development, learning coding fundamentals and solving logical problems using Python and C.",
    badges: ["Problem Solving", "Core Syntax"]
  }
];
