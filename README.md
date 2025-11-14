# UTD Campus Connectivity Dashboard

## 🎯 Project Overview

The UTD Campus Connectivity Dashboard is an intelligent real-time network monitoring solution designed specifically for **UT Dallas** to address campus-wide connectivity challenges. This dual-interface platform serves both students seeking optimal study locations and IT administrators managing network infrastructure.

Built for the **Verizon Innovation Competition**, this dashboard demonstrates how **5G technology** can supplement and enhance traditional campus WiFi networks, providing actionable insights for both end users and network administrators.

---

## 🚀 Problem Statement

University campuses face significant connectivity challenges:
- **Students** struggle to find study spaces with reliable internet during peak hours
- **IT departments** lack real-time visibility into building-level network congestion
- **WiFi infrastructure** becomes overloaded in high-traffic academic buildings
- **Network planning** relies on outdated data rather than live metrics

Our solution provides **instant visibility** into connectivity across 9 real UTD buildings, helping users make informed decisions about where to study, work, or deploy network resources.

---

## 💡 Solution: Dual-Interface Dashboard

### 📱 **Student View - Campus Map**
An interactive campus map showing real-time connectivity status for all major UTD buildings:
- **Color-coded status indicators**: Red (congested), Green (optimal), Blue (high-capacity)
- **Detailed connectivity metrics**: WiFi percentage, cellular signal strength, device density
- **Visual campus layout**: Realistic UTD building positions, roads, and campus features
- **Quick decision-making**: Students instantly identify the best locations for studying

**How Students Benefit:**
- Find optimal study spots before leaving their dorm
- Avoid congested buildings during peak hours (9 AM - 3 PM)
- Plan group projects in buildings with reliable connectivity
- Switch to 5G when WiFi is overloaded (via cellular metrics)

### 🖥️ **IT Dashboard View - Network Administration**
A professional network operations center (NOC) interface for IT staff:
- **Device density heatmap**: Visual representation of top 8 buildings by connected devices
- **Key Performance Indicators (KPIs)**: Average WiFi performance, latency, throughput, 5G edge nodes
- **Top 5 busiest buildings**: Ranked list for prioritizing infrastructure investments
- **Real-time alerts**: High/medium/low severity notifications for network issues
- **Network performance charts**: Time-series data showing WiFi vs cellular performance trends
- **Health indicators**: Packet loss rates and overall network status

**How IT Staff Benefit:**
- Monitor network health across all buildings in real-time
- Identify congestion hotspots requiring immediate attention
- Allocate resources based on actual device density data
- Track performance trends to predict future capacity needs
- Justify infrastructure upgrades with concrete metrics

---

## 🏢 Real UTD Buildings & Realistic Data

### Buildings Featured:
1. **Student Union (SU)** - Central hub, 542 devices, 69% WiFi capacity
2. **Engineering & Computer Science West (ECSW)** - Major academic building, 498 devices, 70% WiFi
3. **Jindal School of Management (JSOM)** - Business school, 421 devices, 65% WiFi
4. **Eugene McDermott Library** - Study center, 235 devices, 89% WiFi (optimal)
5. **Dining Hall West** - Food services, 342 devices, 71% WiFi
6. **Frankford Hall** - Residence hall, 187 devices, 88% WiFi
7. **Natural Science Engineering Research Lab (NSERL)** - Research facility, 156 devices, 91% WiFi
8. **Activity Center** - Recreation facility, 67 devices, 96% WiFi (high-capacity)
9. **Callier Center** - Research center, 38 devices, 95% WiFi

### Data Authenticity:
- **Congested buildings (65-75% WiFi)**: High-traffic academic buildings during peak hours
- **Optimal buildings (88-92% WiFi)**: Well-balanced residential and library spaces
- **High-capacity buildings (95-97% WiFi)**: Low-traffic specialized facilities

All percentages reflect realistic campus network performance based on building type, capacity, and typical usage patterns.

---

## 🌐 WiFi vs 5G: The Verizon Value Proposition

### Why This Comparison Matters:

The dashboard's **WiFi vs 5G cellular comparison** is strategically critical for demonstrating Verizon's competitive advantage:

1. **5G as WiFi Supplement**: When campus WiFi is congested (65-75%), students can seamlessly switch to Verizon's 5G network
2. **Identifying Deployment Opportunities**: IT staff see exactly where 5G small cells could offload WiFi traffic
3. **Dual-Network Strategy**: Universities can partner with Verizon to provide hybrid connectivity (WiFi + 5G)
4. **Future-Proofing**: As IoT devices proliferate on campus, 5G provides scalable capacity beyond WiFi limits

**Competition Relevance**: This positions Verizon not just as a mobile carrier, but as a **strategic partner for campus network infrastructure**, showing concrete use cases where 5G complements existing WiFi networks.

---

## 🛠️ Technical Stack

### Frontend Framework
- **Next.js 16.0.3**: React framework with Turbopack for fast development
- **React 19.2.0**: UI component library with server components
- **TypeScript**: Type-safe development

### Styling & UI Components
- **Tailwind CSS v4**: Utility-first CSS with custom UTD color scheme
  - Primary Orange: `oklch(0.60 0.18 45)`
  - Secondary Green: `oklch(0.65 0.18 145)`
- **Shadcn UI**: Card, Button, Badge, ScrollArea components
- **Lucide React**: Icon library (Activity, Building2, Wifi, Signal, Users, Navigation)

### Data Visualization
- **Recharts**: Interactive charts (AreaChart, BarChart) for network performance
- **Custom SVG Graphics**: Campus roads, circular plaza, building structures

### Architecture
- **Component-based**: Modular design with `student-view.tsx` and `it-dashboard.tsx`
- **State Management**: React hooks for view switching and data handling
- **Real-time Updates**: Prepared for WebSocket integration for live data feeds

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm installed
- Git for cloning the repository

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd v0-campus-connectivity-heatmap
```

### Step 2: Install Dependencies
```bash
npm install --legacy-peer-deps
```
*Note: `--legacy-peer-deps` flag resolves React 19 peer dependency warnings*

### Step 3: Run Development Server
```bash
npm run dev
```

### Step 4: Access the Dashboard
Open your browser and navigate to:
- **Primary URL**: `http://localhost:3000`
- **Fallback URL**: `http://localhost:3001` (if port 3000 is occupied)

The dashboard will load with the **Student Campus Map** view by default. Use the toggle buttons to switch between **Campus Map** and **IT Dashboard** views.

---

## 🎓 Target Audience

### Primary Users: **UTD Students** (29,886 students)
- Undergraduate and graduate students seeking reliable study spaces
- Remote learners needing consistent connectivity for video classes
- Group project teams requiring collaborative workspaces
- Commuters planning their on-campus schedule around connectivity

### Secondary Users: **IT Administrators**
- Network operations center (NOC) staff monitoring campus infrastructure
- Facilities managers planning infrastructure upgrades
- University leadership making technology investment decisions
- Verizon partnership managers identifying deployment opportunities

---

## 🏆 Competition Value Proposition

### Why This Wins for Verizon:

1. **Real-World Application**: Solves actual pain points experienced by 30,000+ students daily
2. **Dual Value Creation**: Benefits both end users (students) and enterprise customers (universities)
3. **5G Use Case**: Demonstrates concrete scenario where 5G complements WiFi, not replaces it
4. **Scalability**: Model can be replicated across all US universities partnering with Verizon
5. **Data-Driven**: Provides metrics justifying 5G small cell deployments on campus
6. **Competitive Advantage**: Shows Verizon as infrastructure partner, not just mobile provider

### Market Opportunity:
- **4,000+ US universities** with similar connectivity challenges
- **20+ million college students** who could benefit from hybrid WiFi/5G solutions
- **Enterprise contracts** for campus-wide 5G deployment partnerships
- **IoT expansion**: Universities adding smart devices (sensors, cameras, AR/VR labs) needing 5G capacity

---

## 🔮 Future Enhancements

- **Live Data Integration**: Connect to real UTD network APIs for actual performance metrics
- **Predictive Analytics**: Machine learning to forecast congestion before it occurs
- **Mobile App**: Native iOS/Android apps for on-the-go connectivity checks
- **Building Interior Maps**: Floor-by-floor heatmaps showing desk-level connectivity
- **User Contributions**: Crowdsourced speed test data from student devices
- **Historical Analysis**: Semester trends showing peak usage patterns

---

## 📄 License

This project was created for the **Verizon Innovation Competition 2025** by the UTD team.

---

## 🙏 Acknowledgments

- **UT Dallas** for campus data and building information
- **Verizon** for sponsoring the innovation competition
- **Next.js & Vercel** for the development framework
- **Recharts** for data visualization tools

---

## 📞 Contact

For questions about this project or partnership opportunities, please contact the development team.

**Built with 🧡 and 💚 (UTD Colors) for the Verizon Innovation Competition**