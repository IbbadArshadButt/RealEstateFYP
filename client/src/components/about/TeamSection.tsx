import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { agentAPI } from "@/services/api";

// Dummy data as fallback
const dummyTeam = [
  {
    name: "Muhammad Asif",
    role: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "Leading Zameen with 20+ years of real estate experience."
  },
  {
    name: "Ayesha Rahman",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b742?w=300&h=300&fit=crop&crop=face",
    description: "Driving innovation and technology advancement at Zameen."
  },
  {
    name: "Hassan Ahmed",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    description: "Ensuring smooth operations across all departments."
  }
];

const TeamSection = () => {
  const [team, setTeam] = useState(dummyTeam);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await agentAPI.getAgents();
        if (response && response.length > 0) {
          // Transform agent data to match our team format
          const transformedAgents = response.slice(0, 3).map(agent => ({
            name: agent.name,
            role: agent.role === 'agent' ? 'Real Estate Agent' : agent.role.charAt(0).toUpperCase() + agent.role.slice(1),
            image: agent.profileImage || agent.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name)}&background=random`,
            description: `Experienced ${agent.role} at Zameen with expertise in real estate.`
          }));
          setTeam(transformedAgents);
        }
      } catch (error) {
        console.error('Error fetching agents:', error);
        // Keep using dummy data if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="py-20">
      <h2 className="text-4xl font-bold text-center mb-16">Our Leadership Team</h2>
      {loading ? (
        <div className="text-center text-gray-600">Loading team members...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-green-100"
            >
              <CardHeader className="text-center">
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover relative z-10 border-4 border-white shadow-lg"
                  />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{member.name}</CardTitle>
                <p className="text-green-600 font-medium mb-4">{member.role}</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSection; 