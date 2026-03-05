import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mountain, 
  Compass, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Users, 
  Shield, 
  Leaf, 
  Heart, 
  ChevronRight, 
  Menu, 
  X, 
  Star,
  Camera,
  MessageSquare,
  Send,
  Trash2,
  Edit2,
  LogOut,
  Image as ImageIcon,
  Video as VideoIcon
} from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useCommunity } from './hooks/useCommunity';
import { cn } from './lib/utils';
import { isFirebaseConfigured } from './firebase';

// --- Components ---

const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loginWithGoogle, logout } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'community', label: 'Community' },
    { id: 'dashboard', label: 'Map' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center overflow-hidden border border-emerald-100 shadow-sm">
               <img 
                 src="https://github.com/ranchesfronda21/Trekora2/blob/main/trekora.jpg?raw=true" 
                 alt="Trekora Logo" 
                 className="w-full h-full object-cover"
                 referrerPolicy="no-referrer"
               />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900">TREKORA</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-emerald-700",
                  activeTab === item.id ? "text-emerald-700" : "text-stone-600"
                )}
              >
                {item.label}
              </button>
            ))}
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-stone-200">
                <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full border border-stone-200" />
                <button onClick={logout} className="text-stone-500 hover:text-red-600 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={loginWithGoogle}
                className="bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-800 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {user && <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full" />}
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
                  className={cn(
                    "block w-full text-left px-3 py-4 text-base font-medium rounded-md",
                    activeTab === item.id ? "bg-emerald-50 text-emerald-700" : "text-stone-600 hover:bg-stone-50"
                  )}
                >
                  {item.label}
                </button>
              ))}
              {!user && (
                <button 
                  onClick={loginWithGoogle}
                  className="w-full mt-4 bg-emerald-700 text-white px-4 py-3 rounded-lg text-base font-medium"
                >
                  Sign In with Google
                </button>
              )}
              {user && (
                <button 
                  onClick={logout}
                  className="w-full mt-4 border border-stone-200 text-stone-600 px-4 py-3 rounded-lg text-base font-medium"
                >
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onExplore }: { onExplore: () => void }) => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070" 
        alt="Mountain Range" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
    
    <div className="relative z-10 text-center px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-emerald-400 uppercase bg-emerald-950/50 backdrop-blur-sm rounded-full border border-emerald-500/30">
          Welcome to Trekora Expedition
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Your Gateway to the World's <span className="text-emerald-400">Majestic Mountains</span>
        </h1>
        <p className="text-lg md:text-xl text-stone-200 mb-10 leading-relaxed max-w-2xl mx-auto">
          Trekora Expedition is a mountain tourism and adventure company dedicated to guiding explorers through the most breathtaking peaks and highland landscapes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
         
          <a 
            href="https://www.facebook.com/share/17zQW5pe1j/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            Book Your Adventure <Facebook className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </div>

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
        <div className="w-1 h-2 bg-white rounded-full" />
      </div>
    </div>
  </section>
);

const About = () => {
  const team = [
    { name: 'BUHANGUE, FRENDELYN', icon: '👩‍🌾' },
    { name: 'CANDIDO, DIVINA', icon: '👩‍💼' },
    { name: 'FRONDA, RANCHES', icon: '👨‍💻' },
    { name: 'LIBRES, ARJEL', icon: '👨‍🔧' },
    { name: 'TORREFIEL, JEMBOY', icon: '👨‍⚕️' },
  ];

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-emerald-700 uppercase mb-4">About Us</h2>
            <h3 className="text-4xl font-bold text-stone-900 mb-8 leading-tight">
              Making mountain exploration accessible, safe, and inspiring.
            </h3>
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p>
                Founded by passionate students of Joji Ilagan College of Business and Tourism, Trekora Expedition was created to bridge the gap between urban life and the raw beauty of the mountains. Our team has explored various mountain ranges across the globe, and we aim to share these life-changing experiences with others.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-stone-100">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                    <Compass className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h4 className="font-bold text-stone-900 mb-2">Our Mission</h4>
                  <p className="text-sm">To provide safe, responsible, and transformative mountain adventures that connect people with nature.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-stone-100">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                    <Mountain className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h4 className="font-bold text-stone-900 mb-2">Our Vision</h4>
                  <p className="text-sm">To become a leading mountain expedition provider in the Philippines, known for excellence in safety and sustainability.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h4 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-700" /> Our Team
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {team.map((member) => (
                  <div key={member.name} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-stone-100 shadow-sm">
                    <div className="text-2xl">{member.icon}</div>
                    <div>
                      <div className="text-sm font-bold text-stone-900">{member.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-900 text-white p-8 rounded-3xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-6">Our Core Values</h4>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: <Shield className="w-5 h-5" />, label: 'Safety First' },
                    { icon: <Leaf className="w-5 h-5" />, label: 'Respect Nature' },
                    { icon: <Users className="w-5 h-5" />, label: 'Teamwork' },
                    { icon: <Heart className="w-5 h-5" />, label: 'Sustainability' },
                  ].map((val) => (
                    <div key={val.label} className="flex items-center gap-3">
                      <div className="text-emerald-400">{val.icon}</div>
                      <span className="text-sm font-medium">{val.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <Mountain className="w-48 h-48" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = ({ onBookNow }: { onBookNow: () => void }) => {
  const services = [
    {
      title: 'Guided Mountain Climbs',
      price: '₱1,500',
      desc: 'Explore iconic and hidden trails with experienced guides.',
      includes: ['Guide fee', 'Registration assistance', 'Itinerary planning'],
      image: 'https://images.unsplash.com/photo-1551632432-c735e7a030bc?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Beginner Hiking Packages',
      price: '₱1,200',
      desc: 'Safe and supportive introduction to mountaineers.',
      includes: ['Pre-climb orientation', 'Pacing support', 'Basic hiking tips'],
      image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Multi-Day Expeditions',
      price: '₱3,500',
      desc: 'Conquer challenging peaks with overnight camping.',
      includes: ['Guide', 'Campsite coordination', 'Survival skills'],
      image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Private & Corporate Programs',
      price: 'Custom',
      desc: 'Custom-designed experiences for groups and teams.',
      includes: ['Team bonding', 'Leadership development', 'Custom itinerary'],
      image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-emerald-700 uppercase mb-4">Our Services</h2>
          <h3 className="text-4xl font-bold text-stone-900">Adventure Packages</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s) => (
            <div key={s.title} className="group bg-stone-50 rounded-3xl overflow-hidden border border-stone-100 hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden relative">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700">
                  Starts at {s.price}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-stone-900 mb-2">{s.title}</h4>
                <p className="text-sm text-stone-600 mb-6 leading-relaxed">{s.desc}</p>
                <div className="space-y-2">
                  {s.includes.map((inc) => (
                    <div key={inc} className="flex items-center gap-2 text-xs text-stone-500">
                      <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                      {inc}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={onBookNow}
                  className="w-full mt-8 py-3 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-900 hover:bg-emerald-700 hover:text-white hover:border-emerald-700 transition-all"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Community = () => {
  const { user, loginWithGoogle } = useAuth();
  const { posts, loading, createPost, updatePost, deletePost, addComment, deleteComment, updateComment } = useCommunity();
  const [newPostContent, setNewPostContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editMediaUrl, setEditMediaUrl] = useState('');
  const [editMediaType, setEditMediaType] = useState<'image' | 'video'>('image');

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newPostContent.trim()) return;

    await createPost({
      userId: user.id,
      userName: user.name,
      userPhoto: user.photo,
      content: newPostContent,
      mediaUrl: mediaUrl || undefined,
      mediaType: mediaUrl ? mediaType : undefined,
    });

    setNewPostContent('');
    setMediaUrl('');
  };

  const handleUpdatePost = async (postId: number) => {
    if (!user || !editContent.trim()) return;
    await updatePost(postId, user.id, {
      content: editContent,
      mediaUrl: editMediaUrl || undefined,
      mediaType: editMediaUrl ? editMediaType : undefined,
    });
    setEditingPostId(null);
  };

  const handleAddComment = async (postId: number, content: string) => {
    if (!user || !content.trim()) return;
    await addComment({
      postId,
      userId: user.id,
      userName: user.name,
      userPhoto: user.photo,
      content,
    });
  };

  if (loading) return <div className="py-24 text-center">Loading community...</div>;

  return (
    <section className="py-24 bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-widest text-emerald-700 uppercase mb-4">Community</h2>
          <h3 className="text-4xl font-bold text-stone-900 mb-4">Summit Stories</h3>
          <p className="text-stone-600">Share your experiences and connect with fellow explorers.</p>
        </div>

        {user ? (
          <form onSubmit={handleCreatePost} className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 mb-12">
            <div className="flex gap-4 mb-4">
              <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full" />
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Share your latest adventure..."
                className="flex-1 bg-stone-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-emerald-500 min-h-[100px] resize-none"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="Media URL (optional)" 
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 w-40"
                  />
                  <select 
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as any)}
                    className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-2 py-1.5"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>
              <button 
                type="submit"
                disabled={!newPostContent.trim()}
                className="bg-emerald-700 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-emerald-800 transition-colors disabled:opacity-50"
              >
                Post Story
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-emerald-900 text-white p-8 rounded-3xl text-center mb-12">
            <h4 className="text-xl font-bold mb-4">Join the Community</h4>
            <p className="text-emerald-100 mb-6">Sign in to share your stories and comment on others' adventures.</p>
            <button 
              onClick={loginWithGoogle}
              className="bg-white text-emerald-900 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors"
            >
              Sign In with Google
            </button>
          </div>
        )}

        <div className="space-y-8">
          {posts.map((post) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={post.userPhoto} alt={post.userName} className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="text-sm font-bold text-stone-900">{post.userName}</div>
                      <div className="text-xs text-stone-500">{new Date(post.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  {user?.id === post.userId && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setEditingPostId(post.id);
                          setEditContent(post.content);
                          setEditMediaUrl(post.mediaUrl || '');
                          setEditMediaType(post.mediaType || 'image');
                        }}
                        className="text-stone-400 hover:text-emerald-600 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deletePost(post.id, user.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {editingPostId === post.id ? (
                  <div className="space-y-4 mb-6">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-emerald-500 min-h-[100px] resize-none"
                    />
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        placeholder="Media URL (optional)" 
                        value={editMediaUrl}
                        onChange={(e) => setEditMediaUrl(e.target.value)}
                        className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 flex-1"
                      />
                      <select 
                        value={editMediaType}
                        onChange={(e) => setEditMediaType(e.target.value as any)}
                        className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-2 py-1.5"
                      >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleUpdatePost(post.id)}
                        className="bg-emerald-700 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-emerald-800"
                      >
                        Save Changes
                      </button>
                      <button 
                        onClick={() => setEditingPostId(null)}
                        className="bg-stone-200 text-stone-700 px-4 py-2 rounded-full text-xs font-bold hover:bg-stone-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-stone-700 leading-relaxed mb-6">{post.content}</p>
                    {post.mediaUrl && (
                      <div className="rounded-2xl overflow-hidden mb-6 bg-stone-100">
                        {post.mediaType === 'video' ? (
                          <video src={post.mediaUrl} controls className="w-full max-h-[400px] object-contain" />
                        ) : (
                          <img src={post.mediaUrl} alt="Post media" className="w-full max-h-[400px] object-contain" referrerPolicy="no-referrer" />
                        )}
                      </div>
                    )}
                  </>
                )}
                
                <div className="pt-6 border-t border-stone-100">
                  <h5 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Comments</h5>
                  <div className="space-y-4 mb-6">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <img src={comment.userPhoto} alt={comment.userName} className="w-8 h-8 rounded-full" />
                        <div className="flex-1 bg-stone-50 rounded-2xl p-3 relative group">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-bold text-stone-900">{comment.userName}</span>
                            {user?.id === comment.userId && (
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => { setEditingCommentId(comment.id); setEditContent(comment.content); }}
                                  className="text-stone-400 hover:text-emerald-600"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                                <button 
                                  onClick={() => deleteComment(comment.id, user.id)}
                                  className="text-stone-400 hover:text-red-600"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                          {editingCommentId === comment.id ? (
                            <div className="space-y-2">
                              <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full bg-white border border-stone-200 rounded-lg p-2 text-sm"
                              />
                              <div className="flex gap-2">
                                <button 
                                  onClick={async () => {
                                    await updateComment(comment.id, user.id, editContent);
                                    setEditingCommentId(null);
                                  }}
                                  className="text-[10px] font-bold text-emerald-700"
                                >
                                  Save
                                </button>
                                <button 
                                  onClick={() => setEditingCommentId(null)}
                                  className="text-[10px] font-bold text-stone-500"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-stone-600">{comment.content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {user && (
                    <div className="flex gap-3">
                      <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full" />
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAddComment(post.id, (e.target as HTMLInputElement).value);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                          className="w-full bg-stone-50 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mountain: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Expedition Booking Request: ${formData.mountain}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Preferred Mountain: ${formData.mountain}\n\n` +
      `Experience/Message:\n${formData.message}`
    );
    window.location.href = `mailto:trekoraexpedition@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-24 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-widest text-emerald-700 uppercase mb-4">Explorer Dashboard</h2>
          <h3 className="text-4xl font-bold text-stone-900 mb-4">Adventure Command Center</h3>
          <p className="text-stone-600">Plan your next summit with real-time data and interactive maps.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mountain Map */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-emerald-700" /> Mountain Explorer Map
              </h4>
              <a 
                href="https://www.google.com/maps/search/mountains/@8.2307342,123.1217624,8z/data=!3m1!4b1!5m2!1e4!1e2?entry=ttu&g_ep=EgoyMDI2MDMwMS4xIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                className="text-xs text-emerald-700 font-bold hover:underline"
              >
                Open in Google Maps
              </a>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden border border-stone-100">
              <iframe 
                src="https://maps.google.com/maps?q=mountains&ll=8.2307342,123.1217624&z=8&t=m&output=embed" 
                className="w-full h-full border-none"
                title="Mountain Map"
              />
            </div>
          </div>

          {/* Weather & Quick Links */}
          <div className="space-y-8">
            <div className="bg-emerald-900 text-white p-8 rounded-3xl relative overflow-hidden">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-emerald-400" /> Weather Forecast
              </h4>
              <p className="text-emerald-100 text-sm mb-6 leading-relaxed">
                Check real-time temperature and weather conditions for your target peaks before you climb.
              </p>
              <a 
                href="https://www.mountain-forecast.com/" 
                target="_blank" 
                className="inline-flex items-center gap-2 bg-white text-emerald-900 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
              >
                Mountain Forecast <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-stone-200">
              <h4 className="text-xl font-bold text-stone-900 mb-6">Book Your Expedition</h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500" 
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500" 
                />
                <input 
                  type="text" 
                  placeholder="Preferred Mountain" 
                  required
                  value={formData.mountain}
                  onChange={(e) => setFormData({...formData, mountain: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500" 
                />
                <textarea 
                  placeholder="Tell us about your experience..." 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 min-h-[100px]" 
                />
                <button 
                  type="submit"
                  className="w-full py-4 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800 transition-colors"
                >
                  Submit Booking Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`General Inquiry: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Preferred Destination: ${formData.destination}\n\n` +
      `Message:\n${formData.message}`
    );
    window.location.href = `mailto:trekoraexpedition@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-emerald-700 uppercase mb-4">Contact Us</h2>
            <h3 className="text-4xl font-bold text-stone-900 mb-8">Get in Touch with Trekora Expedition</h3>
            
            <div className="space-y-8">
              <a href="https://www.facebook.com/share/17zQW5pe1j/?mibextid=wwXIfr" target="_blank" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                  <Facebook className="w-6 h-6 text-stone-600 group-hover:text-emerald-700" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-widest">Facebook</div>
                  <div className="text-stone-900 font-medium">Trekora Expedition</div>
                </div>
              </a>
              <a href="tel:+63946548707" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                  <Phone className="w-6 h-6 text-stone-600 group-hover:text-emerald-700" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-widest">Phone</div>
                  <div className="text-stone-900 font-medium">+63 946 548 707</div>
                </div>
              </a>
              <a href="mailto:trekoraexpedition@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                  <Mail className="w-6 h-6 text-stone-600 group-hover:text-emerald-700" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-widest">Email</div>
                  <div className="text-stone-900 font-medium">trekoraexpedition@gmail.com</div>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-stone-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-widest">Location</div>
                  <div className="text-stone-900 font-medium">Davao, Philippines</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-100">
            <h4 className="text-xl font-bold text-stone-900 mb-6">Send Inquiry</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500" 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <input 
                type="tel" 
                placeholder="Phone Number" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500" 
              />
              <input 
                type="text" 
                placeholder="Preferred Destination" 
                required
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500" 
              />
              <textarea 
                placeholder="Message" 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 min-h-[120px]" 
              />
              <button 
                type="submit"
                className="w-full py-4 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2"
              >
                Send Inquiry <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-xs text-stone-500 mt-4 text-center">We'll get back to you within 24–48 hours.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const PrivacyTerms = () => (
  <section className="py-24 bg-stone-50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-12 rounded-3xl shadow-sm border border-stone-200">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-6">Privacy Policy</h2>
          <div className="space-y-4 text-stone-600 text-sm leading-relaxed">
            <p>Trekora Expedition values your privacy and is committed to protecting your personal information.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>We collect personal data (name, contact number, email) solely for booking, communication, and safety purposes.</li>
              <li>Your information will not be sold, shared, or distributed to third parties without consent.</li>
              <li>Payment information is handled securely through trusted platforms.</li>
              <li>Photos taken during expeditions may be used for promotional purposes unless the client requests otherwise.</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-6">Terms & Conditions</h2>
          <div className="space-y-4 text-stone-600 text-sm leading-relaxed">
            <ul className="list-disc pl-5 space-y-2">
              <li>Participants must be physically fit and disclose any medical conditions prior to the climb.</li>
              <li>Trekora Expedition reserves the right to cancel or reschedule climbs due to weather or safety concerns.</li>
              <li>Down payments are non-refundable but may be transferable depending on circumstances.</li>
              <li>Participants must follow Leave No Trace principles.</li>
              <li>Guides have full authority to make safety decisions during the expedition.</li>
              <li>By booking with Trekora Expedition, clients agree to follow all safety rules and policies.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = ({ setActiveTab }: { setActiveTab: (t: string) => void }) => (
  <footer className="bg-stone-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
               <img 
                 src="https://github.com/ranchesfronda21/Trekora2/blob/main/trekora.jpg?raw=true" 
                 alt="Trekora Logo" 
                 className="w-full h-full object-cover opacity-80"
                 referrerPolicy="no-referrer"
               />
            </div>
            <span className="text-xl font-bold tracking-tight">TREKORA</span>
          </div>
          <p className="text-stone-400 max-w-sm leading-relaxed">
            Dedicated to guiding explorers through the most breathtaking peaks and highland landscapes across the globe.
          </p>
        </div>
        <div>
          <h5 className="font-bold mb-6">Quick Links</h5>
          <ul className="space-y-4 text-sm text-stone-400">
            <li><button onClick={() => setActiveTab('home')} className="hover:text-emerald-400 transition-colors">Home</button></li>
            <li><button onClick={() => setActiveTab('about')} className="hover:text-emerald-400 transition-colors">About Us</button></li>
            <li><button onClick={() => setActiveTab('services')} className="hover:text-emerald-400 transition-colors">Services</button></li>
            <li><button onClick={() => setActiveTab('community')} className="hover:text-emerald-400 transition-colors">Community</button></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-6">Legal</h5>
          <ul className="space-y-4 text-sm text-stone-400">
            <li><button onClick={() => setActiveTab('privacy')} className="hover:text-emerald-400 transition-colors">Privacy Policy</button></li>
            <li><button onClick={() => setActiveTab('privacy')} className="hover:text-emerald-400 transition-colors">Terms & Conditions</button></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
        <p>© 2026 Trekora Expedition. All rights reserved.</p>
        <p>Developer: <a href="mailto:ranches.madrid@gmail.com" className="text-emerald-400 hover:underline">ranches.madrid@gmail.com</a></p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pt-16">
        {activeTab === 'home' && (
          <>
            <Hero onExplore={() => setActiveTab('services')} />
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Shield className="w-8 h-8 text-emerald-700" />
                    </div>
                    <h4 className="text-xl font-bold mb-4">Safe & Guided</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">Trained professionals who prioritize safety and sustainability in every adventure.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Users className="w-8 h-8 text-emerald-700" />
                    </div>
                    <h4 className="text-xl font-bold mb-4">Meaningful Trips</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">From day hikes to multi-day climbs, we ensure unforgettable experiences.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Leaf className="w-8 h-8 text-emerald-700" />
                    </div>
                    <h4 className="text-xl font-bold mb-4">Eco-Friendly</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">Promoting responsible tourism and supporting local communities.</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        {activeTab === 'about' && <About />}
        {activeTab === 'services' && <Services onBookNow={() => setActiveTab('dashboard')} />}
        {activeTab === 'community' && <Community />}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'contact' && <Contact />}
        {activeTab === 'privacy' && <PrivacyTerms />}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
