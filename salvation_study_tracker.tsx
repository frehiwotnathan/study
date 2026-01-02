import React, { useState, useEffect } from 'react';
import { Check, ChevronDown, ChevronRight, BookOpen, Calendar, PenTool, Download, Save, Lightbulb, Heart, Brain, Target } from 'lucide-react';

const SalvationStudyTracker = () => {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [studyData, setStudyData] = useState({});
  const [notes, setNotes] = useState({});
  const [activeNoteTab, setActiveNoteTab] = useState({});

  // Load data from storage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const studyResult = await window.storage.get('salvation-study-data');
        const notesResult = await window.storage.get('salvation-study-notes');
        
        if (studyResult?.value) {
          setStudyData(JSON.parse(studyResult.value));
        }
        if (notesResult?.value) {
          setNotes(JSON.parse(notesResult.value));
        }
      } catch (error) {
        console.log('No existing data found, starting fresh');
      }
    };
    loadData();
  }, []);

  // Save data to storage
  const saveData = async () => {
    try {
      await window.storage.set('salvation-study-data', JSON.stringify(studyData));
      await window.storage.set('salvation-study-notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    if (Object.keys(studyData).length > 0 || Object.keys(notes).length > 0) {
      saveData();
    }
  }, [studyData, notes]);

  const phases = [
    {
      id: 1,
      title: "PHASE 1 — FOUNDATION",
      subtitle: "What happened to me? (Need for salvation)",
      color: "bg-blue-500",
      coreTruth: "Salvation begins with human condition, not human effort.",
      scriptures: [
        { ref: "Ephesians 2:1–3", passage: "Spiritual death and nature" },
        { ref: "Romans 3:9–20", passage: "Universal sinfulness" },
        { ref: "Mark 7:20–23", passage: "Heart condition" }
      ],
      learning: [
        "Spiritual death",
        "Sin as condition, not behavior only",
        "Why salvation is necessary"
      ],
      commentaries: [
        "O'Brien — Ephesians 2:1–3",
        "Moo — Romans 1–3",
        "Edwards — Mark (sin and brokenness)"
      ],
      practices: [
        "Confession",
        "Silence",
        "Honest self-examination"
      ],
      reminder: "Do not rush this phase."
    },
    {
      id: 2,
      title: "PHASE 2 — GRACE & THE CROSS",
      subtitle: "What did God do for me?",
      color: "bg-red-500",
      coreTruth: "Salvation is God's action, not ours.",
      scriptures: [
        { ref: "Ephesians 2:4–7", passage: "God's rich mercy" },
        { ref: "Mark 15:33–39", passage: "The crucifixion" },
        { ref: "Romans 3:21–26", passage: "Righteousness through faith" }
      ],
      learning: [
        "Grace",
        "Atonement",
        "Substitution",
        "God's initiative"
      ],
      commentaries: [
        "Edwards — Mark (Cross theology)",
        "Moo — Romans 3",
        "Wright — Jesus and the Victory of God (selectively)"
      ],
      practices: [
        "Thanksgiving",
        "Cross-centered prayer",
        "Worship"
      ],
      reminder: "Let the cross reshape your view of God."
    },
    {
      id: 3,
      title: "PHASE 3 — FAITH & JUSTIFICATION",
      subtitle: "How do I receive salvation?",
      color: "bg-green-500",
      coreTruth: "Salvation is received by faith, not achieved.",
      scriptures: [
        { ref: "Ephesians 2:8–9", passage: "Saved by grace through faith" },
        { ref: "Romans 4", passage: "Abraham's faith" },
        { ref: "Galatians 2:15–21", passage: "Justified by faith" }
      ],
      learning: [
        "Faith",
        "Justification",
        "Imputed righteousness",
        "Assurance"
      ],
      commentaries: [
        "O'Brien — Eph 2:8–9",
        "Moo — Romans 4",
        "Moo — Galatians"
      ],
      practices: [
        "Trust prayers",
        "Renouncing self-reliance",
        "Assurance meditation"
      ],
      reminder: "This phase stabilizes your soul."
    },
    {
      id: 4,
      title: "PHASE 4 — NEW LIFE & TRANSFORMATION",
      subtitle: "What does salvation change?",
      color: "bg-purple-500",
      coreTruth: "Salvation produces new life, not just forgiveness.",
      scriptures: [
        { ref: "Ephesians 2:10", passage: "Created for good works" },
        { ref: "Romans 6–8", passage: "Dead to sin, alive in Christ" },
        { ref: "John 3", passage: "Born again" }
      ],
      learning: [
        "Regeneration",
        "Union with Christ",
        "Sanctification",
        "Spirit-filled living"
      ],
      commentaries: [
        "Carson — John",
        "Moo — Romans 6–8",
        "O'Brien — Eph 2:10"
      ],
      practices: [
        "Discipline",
        "Obedience",
        "Daily surrender"
      ],
      reminder: "Salvation becomes visible here."
    },
    {
      id: 5,
      title: "PHASE 5 — HOPE, PERSEVERANCE & MISSION",
      subtitle: "Where is salvation leading me?",
      color: "bg-amber-500",
      coreTruth: "Salvation is past, present, and future.",
      scriptures: [
        { ref: "Romans 8:18–39", passage: "Future glory" },
        { ref: "Ephesians 1:13–14", passage: "Sealed with the Spirit" },
        { ref: "Hebrews 9–10", passage: "Christ's perfect sacrifice" }
      ],
      learning: [
        "Assurance",
        "Perseverance",
        "Glory",
        "Mission"
      ],
      commentaries: [
        "Lane — Hebrews",
        "O'Brien — Hebrews",
        "Moo — Romans 8"
      ],
      practices: [
        "Hope meditation",
        "Endurance",
        "Witness"
      ],
      reminder: "This phase gives courage and direction."
    }
  ];

  const noteCategories = [
    { id: 'insights', label: 'Key Insights', icon: Lightbulb, color: 'yellow' },
    { id: 'reflections', label: 'Personal Reflections', icon: Heart, color: 'red' },
    { id: 'questions', label: 'Questions & Struggles', icon: Brain, color: 'blue' },
    { id: 'applications', label: 'How I Will Apply This', icon: Target, color: 'green' }
  ];

  const togglePhaseCompletion = (phaseId) => {
    setStudyData(prev => ({
      ...prev,
      [phaseId]: {
        ...prev[phaseId],
        completed: !prev[phaseId]?.completed
      }
    }));
  };

  const toggleScriptureCompletion = (phaseId, scriptureIndex) => {
    setStudyData(prev => ({
      ...prev,
      [phaseId]: {
        ...prev[phaseId],
        scriptures: {
          ...prev[phaseId]?.scriptures,
          [scriptureIndex]: !prev[phaseId]?.scriptures?.[scriptureIndex]
        }
      }
    }));
  };

  const updateNotes = (phaseId, category, noteText) => {
    setNotes(prev => ({
      ...prev,
      [phaseId]: {
        ...prev[phaseId],
        [category]: noteText
      }
    }));
  };

  const getPhaseProgress = (phaseId) => {
    const phase = phases.find(p => p.id === phaseId);
    if (!phase) return 0;
    
    const completedScriptures = Object.values(studyData[phaseId]?.scriptures || {}).filter(Boolean).length;
    const totalScriptures = phase.scriptures.length;
    
    return totalScriptures > 0 ? Math.round((completedScriptures / totalScriptures) * 100) : 0;
  };

  const generatePDF = () => {
    const printWindow = window.open('', '_blank');
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>My Salvation Study Journey</title>
        <style>
          body {
            font-family: Georgia, serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            color: #333;
          }
          h1 {
            color: #1e40af;
            border-bottom: 3px solid #1e40af;
            padding-bottom: 10px;
            margin-bottom: 30px;
          }
          h2 {
            color: #2563eb;
            margin-top: 40px;
            margin-bottom: 20px;
            page-break-after: avoid;
          }
          h3 {
            color: #3b82f6;
            margin-top: 20px;
            margin-bottom: 10px;
          }
          .phase-section {
            page-break-inside: avoid;
            margin-bottom: 40px;
            padding: 20px;
            background: #f8fafc;
            border-left: 5px solid #3b82f6;
          }
          .core-truth {
            font-style: italic;
            background: #dbeafe;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
          }
          .scripture-list {
            margin: 15px 0;
            padding-left: 20px;
          }
          .note-category {
            margin: 20px 0;
            padding: 15px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 5px;
          }
          .note-category h4 {
            color: #475569;
            margin-top: 0;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .note-content {
            white-space: pre-wrap;
            margin-top: 10px;
            line-height: 1.8;
          }
          .reminder {
            background: #fef3c7;
            padding: 10px 15px;
            margin: 15px 0;
            border-left: 4px solid #f59e0b;
            font-weight: bold;
          }
          .metadata {
            color: #64748b;
            font-size: 14px;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
          }
          @media print {
            body { padding: 20px; }
            .phase-section { page-break-inside: avoid; }
            h2 { page-break-after: avoid; }
          }
        </style>
      </head>
      <body>
        <h1>My Salvation Study Journey</h1>
        <p style="font-style: italic; color: #64748b;">A personal reflection on understanding salvation through Scripture</p>
        
        ${phases.map(phase => {
          const phaseNotes = notes[phase.id] || {};
          const hasNotes = Object.values(phaseNotes).some(note => note && note.trim());
          
          return `
            <div class="phase-section">
              <h2>${phase.title}</h2>
              <p style="color: #64748b; font-size: 18px;">${phase.subtitle}</p>
              
              <div class="core-truth">
                <strong>Core Truth:</strong> ${phase.coreTruth}
              </div>
              
              <h3>Key Scriptures Studied:</h3>
              <ul class="scripture-list">
                ${phase.scriptures.map(s => `<li><strong>${s.ref}</strong> — ${s.passage}</li>`).join('')}
              </ul>
              
              <div class="reminder">📌 ${phase.reminder}</div>
              
              ${hasNotes ? `
                <h3>My Study Notes:</h3>
                ${noteCategories.map(category => {
                  const noteContent = phaseNotes[category.id];
                  return noteContent && noteContent.trim() ? `
                    <div class="note-category">
                      <h4>${category.label}</h4>
                      <div class="note-content">${noteContent}</div>
                    </div>
                  ` : '';
                }).join('')}
              ` : '<p style="color: #94a3b8; font-style: italic;">No notes recorded for this phase yet.</p>'}
            </div>
          `;
        }).join('')}
        
        <div class="metadata">
          <p><strong>Study Completed:</strong> ${new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
          <p><strong>Phases Completed:</strong> ${Object.values(studyData).filter(p => p?.completed).length} of ${phases.length}</p>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-slate-800">Salvation Study - 5 Phases</h1>
            <button
              onClick={generatePDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <Download className="w-5 h-5" />
              Export to PDF
            </button>
          </div>
          <p className="text-slate-600">Track your journey through understanding salvation</p>
          
          {/* Daily Structure Reminder */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Daily 40-Min Study Structure
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-blue-800">
              <div>1. 10 min — Read Scripture slowly</div>
              <div>2. 15 min — Commentary (one voice only)</div>
              <div>3. 10 min — Write reflection</div>
              <div>4. 5 min — Prayer</div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Overall Progress</h2>
          <div className="grid grid-cols-5 gap-2">
            {phases.map(phase => (
              <div key={phase.id} className="text-center">
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${phase.color} text-white font-bold mb-2`}>
                  {studyData[phase.id]?.completed ? <Check className="w-6 h-6" /> : phase.id}
                </div>
                <div className="text-xs text-slate-600">{getPhaseProgress(phase.id)}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Phases List */}
        <div className="space-y-4">
          {phases.map(phase => {
            const isExpanded = expandedPhase === phase.id;
            const isCompleted = studyData[phase.id]?.completed;
            const progress = getPhaseProgress(phase.id);
            const currentTab = activeNoteTab[phase.id] || 'insights';

            return (
              <div key={phase.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Phase Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${phase.color} text-white font-bold`}>
                        {isCompleted ? <Check className="w-6 h-6" /> : phase.id}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800">{phase.title}</h3>
                        <p className="text-sm text-slate-600">{phase.subtitle}</p>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${phase.color}`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-600">{progress}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePhaseCompletion(phase.id);
                        }}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                          isCompleted 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isCompleted ? 'Completed' : 'Mark Complete'}
                      </button>
                      {isExpanded ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                    </div>
                  </div>
                </div>

                {/* Phase Details */}
                {isExpanded && (
                  <div className="p-6 bg-slate-50 border-t">
                    {/* Core Truth */}
                    <div className="mb-6 p-4 bg-white rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-slate-700 mb-2">Core Truth</h4>
                      <p className="text-slate-600 italic">{phase.coreTruth}</p>
                    </div>

                    {/* Key Scriptures */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Key Scriptures
                      </h4>
                      <div className="space-y-2">
                        {phase.scriptures.map((scripture, idx) => (
                          <div 
                            key={idx}
                            className="flex items-start gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                            onClick={() => toggleScriptureCompletion(phase.id, idx)}
                          >
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              studyData[phase.id]?.scriptures?.[idx] 
                                ? 'bg-blue-500 border-blue-500' 
                                : 'border-slate-300'
                            }`}>
                              {studyData[phase.id]?.scriptures?.[idx] && (
                                <Check className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-800">{scripture.ref}</div>
                              <div className="text-sm text-slate-600">{scripture.passage}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* What You Are Learning */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-800 mb-3">What You Are Learning</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {phase.learning.map((item, idx) => (
                          <div key={idx} className="p-3 bg-white rounded-lg text-sm text-slate-700">
                            • {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Commentary Focus */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-800 mb-3">Commentary Focus</h4>
                      <div className="space-y-2">
                        {phase.commentaries.map((commentary, idx) => (
                          <div key={idx} className="p-3 bg-white rounded-lg text-sm text-slate-700">
                            {commentary}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Spiritual Practices */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-800 mb-3">Spiritual Practices</h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.practices.map((practice, idx) => (
                          <span key={idx} className="px-4 py-2 bg-white rounded-full text-sm text-slate-700 border">
                            {practice}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Reminder */}
                    <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-amber-900 font-semibold">📌 {phase.reminder}</p>
                    </div>

                    {/* Enhanced Notes Section */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-lg">
                        <PenTool className="w-6 h-6 text-blue-600" />
                        My Study Journal
                      </h4>
                      
                      {/* Note Category Tabs */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {noteCategories.map(category => {
                          const Icon = category.icon;
                          const isActive = currentTab === category.id;
                          return (
                            <button
                              key={category.id}
                              onClick={() => setActiveNoteTab(prev => ({
                                ...prev,
                                [phase.id]: category.id
                              }))}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                                isActive
                                  ? 'bg-white text-blue-700 shadow-md'
                                  : 'bg-white/50 text-slate-600 hover:bg-white/80'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              {category.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Note Area */}
                      {noteCategories.map(category => {
                        if (currentTab !== category.id) return null;
                        const Icon = category.icon;
                        
                        const placeholders = {
                          insights: "What did God reveal to you through this passage?\n\nWhat truths stood out most powerfully?\n\nHow does this connect to other things you've learned?",
                          reflections: "How does this truth impact you personally?\n\nWhat emotions or thoughts arise as you study this?\n\nWhere do you see yourself in this Scripture?",
                          questions: "What confuses you or needs more understanding?\n\nWhat questions do you want to explore further?\n\nWhat struggles or doubts do you need to bring before God?",
                          applications: "How will you live differently because of this truth?\n\nWhat specific action will you take this week?\n\nWho can you share this with or how will it change your relationships?"
                        };

                        return (
                          <div key={category.id} className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-3 text-slate-700">
                              <Icon className="w-5 h-5" />
                              <span className="font-semibold">{category.label}</span>
                            </div>
                            <textarea
                              value={notes[phase.id]?.[category.id] || ''}
                              onChange={(e) => updateNotes(phase.id, category.id, e.target.value)}
                              placeholder={placeholders[category.id]}
                              className="w-full h-48 p-4 bg-slate-50 rounded-lg border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none resize-none text-slate-700 placeholder-slate-400"
                            />
                          </div>
                        );
                      })}

                      {/* Auto-save indicator */}
                      <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                        <Save className="w-4 h-4" />
                        <span>Notes saved automatically</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SalvationStudyTracker;