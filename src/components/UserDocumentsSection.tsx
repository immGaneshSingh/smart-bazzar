import React, { useState } from 'react';
import { 
  User, 
  FileCheck, 
  ShieldCheck, 
  Lock, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  Download, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  Crown, 
  LogOut, 
  Copy, 
  Check, 
  Edit3, 
  Save, 
  X, 
  CreditCard, 
  FileText, 
  QrCode, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Users
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { UserDocument, DocumentType, UserProfile } from '../types';

export const UserDocumentsSection: React.FC = () => {
  const { 
    user, 
    login,
    logout, 
    updateProfile, 
    addDocument, 
    removeDocument, 
    updateDocumentStatus,
    setIsAuthModalOpen,
    showToast 
  } = useShop();

  // State for unmasked document numbers
  const [revealedDocIds, setRevealedDocIds] = useState<Record<string, boolean>>({});
  const [copiedDocId, setCopiedDocId] = useState<string | null>(null);

  // State for Bio editing
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState(user?.bio || '');
  const [editedOccupation, setEditedOccupation] = useState(user?.occupation || '');
  const [editedEmergency, setEditedEmergency] = useState(user?.emergencyContact || '');

  // State for Add Document Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDocType, setNewDocType] = useState<DocumentType>('aadhaar');
  const [newDocTypeName, setNewDocTypeName] = useState('Aadhaar Card (UIDAI)');
  const [newDocNumber, setNewDocNumber] = useState('');
  const [newDocHolderName, setNewDocHolderName] = useState(user?.name || '');
  const [newDocIssueDate, setNewDocIssueDate] = useState('15 Jan 2022');
  const [newDocExpiryDate, setNewDocExpiryDate] = useState('Permanent (Life)');
  const [newDocNotes, setNewDocNotes] = useState('');
  const [selectedFileSim, setSelectedFileSim] = useState<string | null>(null);

  // State for Digital ID Card Preview Modal
  const [previewDoc, setPreviewDoc] = useState<UserDocument | null>(null);
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');

  if (!user) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center max-w-xl mx-auto my-12 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black text-slate-900">Personal Documents & Account Vault</h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          For your safety and privacy, every customer only has access to their own account. Please sign in to securely view your verified KYC documents, delivery addresses, and order history.
        </p>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sign In With Your Mobile Number</span>
          </button>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-700 mb-2">
              Test Customer Account Isolation:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
              <button
                type="button"
                onClick={() => login({ phone: '+91 62044 12345', name: 'Ganesh Singh' })}
                className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100/70 text-xs transition-colors cursor-pointer"
              >
                <span className="font-extrabold text-slate-900 block">Ganesh Singh</span>
                <span className="text-[10px] text-slate-500 font-mono">+91 62044 12345</span>
                <span className="block text-[10px] text-amber-800 font-semibold mt-0.5">4 Verified Documents (Aadhaar, PAN, GSTIN, VIP)</span>
              </button>

              <button
                type="button"
                onClick={() => login({ phone: '+91 94312 88990', name: 'Priya Sharma' })}
                className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100/70 text-xs transition-colors cursor-pointer"
              >
                <span className="font-extrabold text-slate-900 block">Priya Sharma</span>
                <span className="text-[10px] text-slate-500 font-mono">+91 94312 88990</span>
                <span className="block text-[10px] text-purple-800 font-semibold mt-0.5">2 Verified Documents (Aadhaar, Gold ID)</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-600" />
            Private Encrypted Vault
          </span>
          <span>•</span>
          <span>No Shared Accounts</span>
        </div>
      </div>
    );
  }

  const toggleReveal = (docId: string) => {
    setRevealedDocIds(prev => ({ ...prev, [docId]: !prev[docId] }));
  };

  const handleCopyNumber = (docId: string, number: string) => {
    navigator.clipboard?.writeText(number);
    setCopiedDocId(docId);
    showToast('Document number copied to clipboard');
    setTimeout(() => setCopiedDocId(null), 2000);
  };

  const handleSaveBio = () => {
    updateProfile({
      bio: editedBio,
      occupation: editedOccupation,
      emergencyContact: editedEmergency
    });
    setIsEditingBio(false);
  };

  const handleOpenAddModal = () => {
    setNewDocNumber('');
    setNewDocHolderName(user.name);
    setNewDocNotes('');
    setSelectedFileSim(null);
    setShowAddModal(true);
  };

  const handleDocTypeChange = (type: DocumentType) => {
    setNewDocType(type);
    switch (type) {
      case 'aadhaar':
        setNewDocTypeName('Aadhaar Card (UIDAI)');
        setNewDocExpiryDate('Permanent (Life)');
        break;
      case 'pan':
        setNewDocTypeName('PAN Card (Income Tax Dept)');
        setNewDocExpiryDate('Permanent (Life)');
        break;
      case 'voter_id':
        setNewDocTypeName('Voter Identity Card (ECI)');
        setNewDocExpiryDate('Permanent (Life)');
        break;
      case 'driving_license':
        setNewDocTypeName('Driving License (Bihar Transport)');
        setNewDocExpiryDate('20 Oct 2038');
        break;
      case 'gstin':
        setNewDocTypeName('GSTIN Trade Registration');
        setNewDocExpiryDate('Active Validated');
        break;
      case 'address_proof':
        setNewDocTypeName('Residence Proof (Electricity/Utility)');
        setNewDocExpiryDate('Valid 6 Months');
        break;
      case 'smart_bazzar_club':
        setNewDocTypeName('Smart Bazzar VIP Club Membership');
        setNewDocExpiryDate('31 Dec 2026');
        break;
      default:
        setNewDocTypeName('Government Issued Identity');
        setNewDocExpiryDate('Valid');
    }
  };

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocNumber.trim()) {
      alert('Please enter a valid document number');
      return;
    }

    addDocument({
      type: newDocType,
      typeName: newDocTypeName,
      documentNumber: newDocNumber.trim(),
      fullName: newDocHolderName.trim() || user.name,
      issueDate: newDocIssueDate,
      expiryDate: newDocExpiryDate,
      status: 'verified',
      verifiedBy: 'Smart Bazzar KYC Security Cell',
      notes: newDocNotes || 'Registered for offline mall privileges and online doorstep delivery.'
    });

    setShowAddModal(false);
  };

  const docs = user.documents || [];
  const verifiedCount = docs.filter(d => d.status === 'verified').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. PERSONAL ACCOUNT SECURITY & PRIVACY STATUS BAR */}
      <div className="bg-slate-900 text-white rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/60">
                  Private & Encrypted
                </span>
                <span className="text-[10px] text-slate-400">Account ID: {user.id}</span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-white mt-0.5">
                My Customer Account: <span className="text-amber-400">{user.name}</span>
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] text-slate-400">Phone: <span className="text-slate-200 font-mono font-medium">{user.phone}</span></p>
              <p className="text-[10px] text-emerald-400 font-medium">● Isolated Session Active</p>
            </div>

            {/* Logout button */}
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 text-xs font-bold border border-red-800/60 cursor-pointer transition-colors shadow-xs"
              title="Securely sign out of this customer account"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. ABOUT USER DOSSIER & PROFILE CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
        
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          
          {/* User Photo & Primary Bio */}
          <div className="flex items-start gap-4 sm:gap-6 flex-1">
            <div className="relative shrink-0">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80'}
                alt={user.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] tracking-wide uppercase shadow-xs">
                {user.memberTier}
              </div>
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">{user.name}</h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  KYC {user.kycStatus === 'verified' ? 'Level 3 Verified' : 'Pending Verification'}
                </span>
              </div>

              {/* Editable Bio / About Section */}
              {!isEditingBio ? (
                <div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                    {user.bio || 'Smart Bazzar Lakhisarai registered customer with verified citizen documentation.'}
                  </p>
                  <button
                    onClick={() => {
                      setEditedBio(user.bio || '');
                      setEditedOccupation(user.occupation || '');
                      setEditedEmergency(user.emergencyContact || '');
                      setIsEditingBio(true);
                    }}
                    className="mt-2 text-[11px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit About Info</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3 mt-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">About / Bio</label>
                    <textarea
                      rows={2}
                      value={editedBio}
                      onChange={(e) => setEditedBio(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                      placeholder="Write brief about details..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Occupation</label>
                      <input
                        type="text"
                        value={editedOccupation}
                        onChange={(e) => setEditedOccupation(e.target.value)}
                        className="w-full p-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Emergency Contact</label>
                      <input
                        type="text"
                        value={editedEmergency}
                        onChange={(e) => setEditedEmergency(e.target.value)}
                        className="w-full p-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={handleSaveBio}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1 hover:bg-amber-400 cursor-pointer"
                    >
                      <Save className="w-3 h-3" />
                      <span>Save Changes</span>
                    </button>
                    <button
                      onClick={() => setIsEditingBio(false)}
                      className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-300 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Quick Stats Dossier */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs shrink-0 lg:w-64">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Date of Birth</span>
              <span className="font-bold text-slate-800">{user.dateOfBirth || '01 Jan 1988'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Profession</span>
              <span className="font-bold text-slate-800">{user.occupation || 'Entrepreneur & Retailer'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Primary Hub</span>
              <span className="font-bold text-slate-800">Smart Bazzar NH-80</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Emergency Phone</span>
              <span className="font-bold text-slate-800">{user.emergencyContact || user.phone}</span>
            </div>
          </div>

        </div>

      </div>

      {/* 3. PERSONAL DOCUMENTS VAULT HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-slate-900">Personal Documents Vault</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-xs font-bold">
              {docs.length} on File
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            256-bit encrypted government IDs for offline mall services, electronics warranties, and express doorstep delivery.
          </p>
        </div>

        {/* Action Button to Add New Document */}
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Upload / Add New Document</span>
        </button>
      </div>

      {/* 4. DOCUMENTS GRID */}
      {docs.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-800">No Documents Uploaded Yet</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Upload Aadhaar, PAN, Voter ID, or Address Proof to enable instant KYC verification and zero-deposit shopping carts.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
          >
            Add Your First Document
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc) => {
            const isRevealed = !!revealedDocIds[doc.id];
            const isCopied = copiedDocId === doc.id;

            return (
              <div
                key={doc.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Top Holographic Strip */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-600" />

                <div>
                  {/* Top Bar: Icon + Status */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/60 shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>

                    <div className="text-right">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        doc.status === 'verified'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : doc.status === 'active'
                          ? 'bg-blue-100 text-blue-900 border border-blue-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {doc.status === 'verified' ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Clock className="w-3 h-3 text-amber-600" />}
                        <span>{doc.status}</span>
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-1">{doc.uploadedAt}</span>
                    </div>
                  </div>

                  {/* Document Name */}
                  <h4 className="text-sm font-black text-slate-900 leading-tight">
                    {doc.typeName}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Holder: <strong className="text-slate-700">{doc.fullName}</strong>
                  </p>

                  {/* Document Number Box with Masking & Copy */}
                  <div className="my-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
                        Document Number
                      </span>
                      <span className="font-mono text-xs font-black text-slate-900 tracking-wider">
                        {isRevealed ? doc.documentNumber : doc.documentNumber.replace(/.(?=.{4})/g, '•')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleReveal(doc.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
                        title={isRevealed ? "Hide number" : "Show number"}
                      >
                        {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => handleCopyNumber(doc.id, doc.documentNumber)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
                        title="Copy document number"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Validity Details */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 mb-4 pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-slate-400 block font-semibold">Issue Date:</span>
                      <span className="font-bold">{doc.issueDate || 'Verified'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Validity:</span>
                      <span className="font-bold">{doc.expiryDate || 'Permanent'}</span>
                    </div>
                  </div>

                  {doc.notes && (
                    <p className="text-[11px] text-slate-500 line-clamp-2 italic mb-4">
                      "{doc.notes}"
                    </p>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      setPreviewDoc(doc);
                      setCardSide('front');
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Digital Card</span>
                  </button>

                  <button
                    onClick={() => {
                      showToast(`Downloading official e-copy for ${doc.typeName}`);
                    }}
                    className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                    title="Download e-Document"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => removeDocument(doc.id)}
                    className="p-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                    title="Remove document from vault"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* 5. ADD DOCUMENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative animate-in fade-in-50 duration-150">
            
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Add Personal Document</h3>
                <p className="text-xs text-slate-500">Securely store government identity and registration records.</p>
              </div>
            </div>

            <form onSubmit={handleCreateDocument} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Document Type</label>
                <select
                  value={newDocType}
                  onChange={(e) => handleDocTypeChange(e.target.value as DocumentType)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                >
                  <option value="aadhaar">Aadhaar Card (UIDAI 12-Digit)</option>
                  <option value="pan">PAN Card (Income Tax 10-Character)</option>
                  <option value="voter_id">Voter ID Card (Election Commission)</option>
                  <option value="driving_license">Driving License (State Transport)</option>
                  <option value="gstin">GSTIN Commercial Certificate</option>
                  <option value="address_proof">Residence Proof (Electricity/Utility)</option>
                  <option value="smart_bazzar_club">Smart Bazzar VIP Club Card</option>
                  <option value="other">Other Official Document</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Document Number</label>
                <input
                  type="text"
                  required
                  placeholder={newDocType === 'aadhaar' ? 'e.g. 7845-2190-8921' : newDocType === 'pan' ? 'e.g. ABCDE1234F' : 'Enter document number'}
                  value={newDocNumber}
                  onChange={(e) => setNewDocNumber(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 uppercase"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name (As printed on document)</label>
                <input
                  type="text"
                  required
                  value={newDocHolderName}
                  onChange={(e) => setNewDocHolderName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Issue Date</label>
                  <input
                    type="text"
                    value={newDocIssueDate}
                    onChange={(e) => setNewDocIssueDate(e.target.value)}
                    placeholder="e.g. 15 Jan 2022"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expiry / Validity</label>
                  <input
                    type="text"
                    value={newDocExpiryDate}
                    onChange={(e) => setNewDocExpiryDate(e.target.value)}
                    placeholder="e.g. Permanent"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Upload File (PDF / Image)</label>
                <div 
                  onClick={() => setSelectedFileSim('scanned_document_verified.pdf')}
                  className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center cursor-pointer hover:bg-amber-50/40 hover:border-amber-400 transition-colors"
                >
                  <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-slate-700 block">
                    {selectedFileSim ? `Selected: ${selectedFileSim}` : 'Click to select document copy'}
                  </span>
                  <span className="text-[10px] text-slate-400">Supported: PDF, JPG, PNG (Max 5MB)</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notes / Authority</label>
                <input
                  type="text"
                  value={newDocNotes}
                  onChange={(e) => setNewDocNotes(e.target.value)}
                  placeholder="e.g. Issued by UIDAI / Govt of Bihar"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  Save to Document Vault
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* 6. REALISTIC DIGITAL ID CARD PREVIEW MODAL */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden border border-slate-200 shadow-2xl relative animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black uppercase tracking-wider">
                  Digital E-Document Viewer
                </span>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Realistic Digital Card Layout */}
            <div className="p-6">
              
              {/* The Card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 via-white to-amber-50/50 p-5 border-2 border-slate-300 shadow-lg text-slate-900 overflow-hidden">
                
                {/* Government / Card Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                      SB
                    </div>
                    <div>
                      <h5 className="text-[11px] font-black uppercase tracking-tight text-slate-900">
                        {previewDoc.typeName}
                      </h5>
                      <p className="text-[9px] text-slate-500">
                        {previewDoc.verifiedBy || 'Smart Bazzar Verified Citizen Vault'}
                      </p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>

                {cardSide === 'front' ? (
                  /* FRONT OF CARD */
                  <div className="space-y-3">
                    <div className="flex gap-4 items-center">
                      <img
                        src={user.avatar}
                        alt={previewDoc.fullName}
                        className="w-16 h-20 rounded-xl object-cover border-2 border-amber-400 shadow-sm"
                      />
                      <div className="space-y-1 text-xs">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">Cardholder Name</span>
                          <span className="font-black text-sm text-slate-900">{previewDoc.fullName}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">Father / Guardian</span>
                          <span className="font-semibold text-slate-700">Shri R. P. Singh</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">Date of Birth / Gender</span>
                          <span className="font-semibold text-slate-700">{user.dateOfBirth || '01 Jan 1988'} • Male</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-100 rounded-xl text-center border border-slate-200">
                      <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block mb-0.5">
                        Document Number
                      </span>
                      <span className="font-mono text-base font-black tracking-widest text-slate-900">
                        {previewDoc.documentNumber}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                      <span>Issued: {previewDoc.issueDate || '15 Jan 2022'}</span>
                      <span>Valid: {previewDoc.expiryDate || 'Permanent'}</span>
                    </div>
                  </div>
                ) : (
                  /* BACK OF CARD */
                  <div className="space-y-3">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Permanent Address</span>
                      <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                        Near Town Thana, NH-80 Main Road, Ward 12, Lakhisarai, Bihar - 811311
                      </p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-100 rounded-xl border border-slate-200">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-bold text-slate-500 uppercase block">Digital Verification Hash</span>
                        <span className="font-mono text-[10px] text-slate-800 font-bold block">
                          SB-KYC-811311-{previewDoc.id}
                        </span>
                        <span className="text-[9px] text-emerald-700 font-semibold block">
                          ✓ Signed with 256-Bit Cryptographic Key
                        </span>
                      </div>
                      <div className="w-12 h-12 bg-white p-1 rounded-lg border border-slate-200 flex items-center justify-center">
                        <QrCode className="w-10 h-10 text-slate-800" />
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 text-center pt-1">
                      Official E-Card for Smart Bazzar Lakhisarai Customer Records.
                    </div>
                  </div>
                )}

                {/* Hologram visual indicator */}
                <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Government ID Vault
                  </span>
                  <button
                    onClick={() => setCardSide(cardSide === 'front' ? 'back' : 'front')}
                    className="text-amber-700 font-black hover:underline cursor-pointer"
                  >
                    Flip to {cardSide === 'front' ? 'Back Side ➔' : 'Front Side ➔'}
                  </button>
                </div>

              </div>

              {/* Action Buttons in Modal */}
              <div className="mt-5 flex items-center gap-3">
                <button
                  onClick={() => {
                    showToast(`Downloading official e-card PDF for ${previewDoc.typeName}`);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download E-Card</span>
                </button>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
