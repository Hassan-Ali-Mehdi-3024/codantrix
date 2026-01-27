import { createClient } from '@/utils/supabase/server'
import CaseStudyCard from '@/components/cards/CaseStudyCard'

export const dynamic = 'force-dynamic'

const portfolioProjects = [
    {
        id: '1',
        title: "Autonomous Drone Fleet Management",
        slug: "drone-fleet-management",
        industry: "Logistics",
        client_name: "AeroLogistics Inc.",
        results: { "Efficiency Gain": "40%", "Delivery Time": "-25%" },
        duration: "8 Months",
        team_size: "6 Engineers",
        technologies: ["Python", "ROS", "AWS IoT", "React"],
        problem: "Inefficient manual tracking of drone deliveries leading to delays and lost packages.",
        solution: "Developed a centralized fleet management dashboard with real-time telemetry and automated route optimization.",
        unique_approach: "Implemented a custom mesh networking protocol for drone-to-drone communication in low-connectivity areas."
    },
    {
        id: '2',
        title: "Predictive Maintenance for heavy Machinery",
        slug: "predictive-maintenance",
        industry: "Manufacturing",
        client_name: "HeavyMetal Corp",
        results: { "Downtime Reduction": "60%", "Cost Savings": "$2M/yr" },
        duration: "12 Months",
        team_size: "8 Engineers",
        technologies: ["TensorFlow", "Edge AI", "Python", "Grafana"],
        problem: "Unexpected machinery breakdowns causing costly production halts.",
        solution: "Deployed edge AI models on sensor nodes to detect vibration anomalies and predict failures weeks in advance.",
        unique_approach: "Utilized transfer learning to adapt models across different machine types with minimal retraining."
    },
    {
        id: '3',
        title: "AI-Powered Quality Control System",
        slug: "ai-quality-control",
        industry: "Automotive",
        client_name: "AutoTech Solutions",
        results: { "Defect Detection": "99.9%", "Inspection Speed": "200ms" },
        duration: "6 Months",
        team_size: "5 Engineers",
        technologies: ["YOLOv8", "OpenCV", "C++", "NVIDIA Jetson"],
        problem: "Manual visual inspection was slow and prone to human error, letting defects slip through.",
        solution: "Built a high-speed computer vision rig that inspects parts on the assembly line in real-time.",
        unique_approach: "Created a synthetic data pipeline to train the model on rare defect types not yet seen in production."
    },
    {
        id: '4',
        title: "Smart Grid Energy Optimization",
        slug: "smart-grid-energy",
        industry: "Energy",
        client_name: "GreenPower Utilities",
        results: { "Energy Waste": "-15%", "Grid Stability": "99.99%" },
        duration: "14 Months",
        team_size: "10 Engineers",
        technologies: ["Reinforcement Learning", "Python", "Azure", "TimeScaleDB"],
        problem: "Fluctuating renewable energy sources causing grid instability and inefficiency.",
        solution: "Implemented a reinforcement learning agent to balance load and storage in real-time.",
        unique_approach: "Simulated millions of grid scenarios to train the agent before safe deployment on the live network."
    },
    {
        id: '5',
        title: "Retail Foot Traffic Analytics",
        slug: "retail-analytics",
        industry: "Retail",
        client_name: "ShopSmart Malls",
        results: { "Sales Conversion": "+12%", "Staffing Efficiency": "+20%" },
        duration: "5 Months",
        team_size: "4 Engineers",
        technologies: ["Computer Vision", "Privacy-Preserving AI", "React", "Node.js"],
        problem: "Brick-and-mortar stores lacked the detailed analytics of e-commerce competitors.",
        solution: "Deployed privacy-compliant camera systems to track customer journey and dwell times.",
        unique_approach: "Processed all video feeds locally on edge devices, sending only anonymous metadata to the cloud."
    },
    {
        id: '6',
        title: "Financial Fraud Detection Engine",
        slug: "fraud-detection",
        industry: "FinTech",
        client_name: "SecureBank Global",
        results: { "Fraud Blocked": "$50M+", "False Positives": "-30%" },
        duration: "9 Months",
        team_size: "7 Engineers",
        technologies: ["XGBoost", "Spark", "Scala", "Kafka"],
        problem: "Rule-based fraud detection was missing sophisticated attack patterns.",
        solution: "Built a real-time transaction scoring engine using ensemble machine learning models.",
        unique_approach: "Integrated graph neural networks to detect organized fraud rings and money laundering networks."
    },
    {
        id: '7',
        title: "Precision Agriculture Crop Monitoring",
        slug: "precision-ag",
        industry: "Agriculture",
        client_name: "AgriFuture Farms",
        results: { "Yield Increase": "18%", "Water Usage": "-25%" },
        duration: "7 Months",
        team_size: "5 Engineers",
        technologies: ["Satellite Imagery", "IoT Sensors", "Python", "React Native"],
        problem: "Uniform irrigation and fertilization was wasteful and suboptimal for variable field conditions.",
        solution: "Combined satellite data with ground sensors to create prescription maps for automated tractors.",
        unique_approach: "Developed a offline-first mobile app for farmers to access insights in remote fields with no connectivity."
    },
    {
        id: '8',
        title: "Supply Chain Digital Twin",
        slug: "supply-chain-twin",
        industry: "Logistics",
        client_name: "GlobalFreight Co.",
        results: { "Inventory Costs": "-10%", "On-Time Delivery": "98%" },
        duration: "11 Months",
        team_size: "9 Engineers",
        technologies: ["Simulation", "Python", "Digital Twin", "Three.js"],
        problem: "Lack of visibility into supply chain bottlenecks and inability to test 'what-if' scenarios.",
        solution: "Created a full digital twin of the logistics network to simulate disruptions and optimize routing.",
        unique_approach: "Visualized the entire network in a 3D interactive web dashboard for executive decision making."
    }
]

export default function CaseStudiesHub() {
    return (
        <div className="pt-32 pb-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-16 mx-auto text-center">
                    <h2 className="text-[#f15a2f] font-bold uppercase tracking-[0.3em] mb-4 text-sm">Proof of Performance</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">
                        Measured <br /> <span className="text-[#f15a2f]">ROI.</span>
                    </h1>
                    <p className="text-xl text-[#fffdf2]/70 leading-relaxed">
                        We don&apos;t talk about theoretical accuracy. We deliver measurable business impact. Here is how we&apos;ve solved enterprise challenges in the last 12 months.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioProjects.map((study) => (
                        <CaseStudyCard
                            key={study.id}
                            title={study.title}
                            slug={study.slug}
                            industry={study.industry}
                            client={study.client_name}
                            result={Object.entries(study.results).map(([k, v]) => `${k}: ${v}`).join(', ')}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
