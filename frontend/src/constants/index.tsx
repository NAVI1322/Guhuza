import { Gamepad, Star, UserCheck, Users, Award, Lock } from "lucide-react";
import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "How it Works", href: "#" },
  { label: "Game Features", href: "#" },
  { label: "Pricing Plans", href: "#" },
  { label: "Community", href: "#" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "The Guhuza Job-Seeking Game has transformed how we view recruitment. The engaging elements make job-seeking less daunting and more interactive.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "We love the competitive aspects! The game brings fun into the job search while still focusing on real skills and career progression.",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Guhuza’s game is an innovative tool that connects job seekers and companies in a unique, interactive way. Highly recommend it!",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "The gamification of recruitment is a game-changer! The leaderboards and achievements motivate users to reach their career goals faster.",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "The strong network effects built into the game make Guhuza a powerful platform for expanding our hiring reach organically.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "Guhuza’s approach brings a fresh perspective to recruitment, making it an enjoyable and rewarding experience for everyone involved.",
  },
];


export const features = [
  {
    icon: <Gamepad />,
    text: "Interactive Job-Seeking Challenges",
    description: "Engage with resume-building tasks, interview simulations, and career quizzes to level up your job-seeking skills.",
  },
  {
    icon: <Star />,
    text: "Referral Bonuses & Rewards",
    description: "Invite friends and earn referral bonuses, badges, and rewards for expanding the Guhuza network.",
  },
  {
    icon: <Users />,
    text: "Career Leaderboards",
    description: "Compete with other users on leaderboards, achieve high scores, and showcase your career progression.",
  },
  {
    icon: <UserCheck />,
    text: "Daily Challenges & Streaks",
    description: "Keep your momentum going with daily challenges, streaks, and seasonal events to stay motivated.",
  },
  {
    icon: <Lock />,
    text: "Social Sharing Options",
    description: "Share your achievements and progress with friends on social media to grow the Guhuza community.",
  },
  {
    icon: <Award />,
    text: "Analytics & Insights",
    description: "Track your performance, see where you stand in the community, and use insights to improve your career strategies.",
  },
];

export const checklistItems = [
  {
    title: "Referral Bonuses for Network Expansion",
    description: "Increase your impact by referring friends and earning rewards for each successful connection.",
  },
  {
    title: "Showcase Skills Through Interactive Games",
    description: "Prove your worth by participating in skill-based challenges that demonstrate your qualifications to potential employers.",
  },
  {
    title: "Compete and Collaborate with Peers",
    description: "Make the job search fun by competing on leaderboards and collaborating with peers for team achievements.",
  },
  {
    title: "Track Your Career Growth",
    description: "Monitor your progress, complete challenges, and earn badges that highlight your career journey.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Access to Basic Challenges",
      "Profile Customization",
      "Community Access",
      "Social Sharing",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Access to Advanced Challenges",
      "Personalized Career Coaching",
      "Enhanced Analytics & Insights",
      "Referral Bonuses",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Corporate Integration",
      "Team Collaboration Tools",
      "Custom Career Paths",
      "Full Analytics Suite",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started Guide" },
  { href: "#", text: "Game Mechanics Documentation" },
  { href: "#", text: "Tutorials & Tips" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Support" },
];

export const platformLinks = [
  { href: "#", text: "Game Features" },
  { href: "#", text: "Supported Platforms" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Version History" },
];

export const communityLinks = [
  { href: "#", text: "Community Events" },
  { href: "#", text: "User Meetups" },
  { href: "#", text: "Industry Conferences" },
  { href: "#", text: "Hackathons & Challenges" },
  { href: "#", text: "Job Opportunities" },
];
