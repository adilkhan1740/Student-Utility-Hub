import { useState } from 'react'
import html2pdf from 'html2pdf.js'
import './App.css'

function App() {

  // =========================================================
  // PERCENTAGE CALCULATOR
  // =========================================================

  const [obtained, setObtained] = useState('')
  const [totalMarks, setTotalMarks] = useState('')
  const [percentageResult, setPercentageResult] = useState('')

  const calculatePercentage = () => {
    if (obtained === '' || totalMarks === '') {
      setPercentageResult('Please enter both marks.')
      return
    }

    if (Number(totalMarks) <= 0) {
      setPercentageResult('Total marks must be greater than 0.')
      return
    }

    if (Number(obtained) < 0) {
      setPercentageResult('Marks cannot be negative.')
      return
    }

    if (Number(obtained) > Number(totalMarks)) {
      setPercentageResult(
        'Obtained marks cannot be greater than total marks.'
      )
      return
    }

    const percentage =
      (Number(obtained) / Number(totalMarks)) * 100

    setPercentageResult(`${percentage.toFixed(2)}%`)
  }


  // =========================================================
  // CGPA CALCULATOR
  // =========================================================

  const [cgpaInput, setCgpaInput] = useState('')
  const [cgpaResult, setCgpaResult] = useState('')

  const calculateCGPA = () => {
    if (cgpaInput.trim() === '') {
      setCgpaResult('Please enter your semester CGPAs.')
      return
    }

    const values = cgpaInput
      .split(',')
      .map((value) => Number(value.trim()))

    if (values.some((value) => Number.isNaN(value))) {
      setCgpaResult('Please enter valid CGPA values.')
      return
    }

    if (values.some((value) => value < 0 || value > 10)) {
      setCgpaResult('CGPA should be between 0 and 10.')
      return
    }

    const sum = values.reduce(
      (total, value) => total + value,
      0
    )

    const cgpa = sum / values.length

    setCgpaResult(cgpa.toFixed(2))
  }


  // =========================================================
  // RESUME MAKER
  // =========================================================

  const [resume, setResume] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    education: '',
    skills: '',
    projects: '',
    experience: '',
    summary: ''
  })

  const [resumeGenerated, setResumeGenerated] = useState(false)

  const handleResumeChange = (event) => {
    const { name, value } = event.target

    setResume((previousResume) => ({
      ...previousResume,
      [name]: value
    }))
  }


  // =========================================================
  // GENERATE RESUME
  // =========================================================

  const generateResume = () => {
    if (
      resume.name.trim() === '' ||
      resume.email.trim() === ''
    ) {
      alert('Please enter your Full Name and Email Address.')
      return
    }

    setResumeGenerated(true)

    setTimeout(() => {
      const preview = document.getElementById(
        'resume-preview-section'
      )

      if (preview) {
        preview.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }, 100)
  }


  // =========================================================
  // DOWNLOAD RESUME PDF
  // =========================================================

  const downloadResumePDF = () => {
    const element = document.getElementById('resume-pdf')

    if (!element) {
      alert('Please generate your resume first.')
      return
    }

    const safeName =
      resume.name
        .trim()
        .replace(/[^a-zA-Z0-9-_ ]/g, '')
        .replace(/\s+/g, '-')

    const options = {
      margin: 0,
      filename: `${safeName || 'Student'}-Resume.pdf`,
      image: {
        type: 'jpeg',
        quality: 0.98
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    }

    html2pdf()
      .set(options)
      .from(element)
      .save()
  }


  // =========================================================
  // APPLICATION GENERATOR
  // =========================================================

  const [applicationType, setApplicationType] =
    useState('Leave Application')

  const [studentName, setStudentName] =
    useState('')

  const [collegeName, setCollegeName] =
    useState('')

  const [applicationReason, setApplicationReason] =
    useState('')

  const [applicationResult, setApplicationResult] =
    useState('')


  // =========================================================
  // GENERATE APPLICATION
  // =========================================================

  const generateApplication = () => {

    if (
      studentName.trim() === '' ||
      collegeName.trim() === '' ||
      applicationReason.trim() === ''
    ) {
      alert('Please fill all the application details.')
      return
    }

    let application = ''


    // -------------------------------------------------------
    // LEAVE APPLICATION
    // -------------------------------------------------------

    if (applicationType === 'Leave Application') {

      application = `To,
The Principal,
${collegeName}

Subject: Application for Leave

Respected Sir/Madam,

I am ${studentName}, a student of your college. I kindly request you to grant me leave because ${applicationReason}.

I shall be grateful to you for considering my request.

Thank you.

Yours faithfully,
${studentName}`

    }


    // -------------------------------------------------------
    // BONAFIDE CERTIFICATE
    // -------------------------------------------------------

    else if (applicationType === 'Bonafide Certificate') {

      application = `To,
The Principal,
${collegeName}

Subject: Application for Bonafide Certificate

Respected Sir/Madam,

I am ${studentName}, a student of your college. I kindly request you to issue me a Bonafide Certificate for ${applicationReason}.

I shall be grateful for your kind consideration.

Thank you.

Yours faithfully,
${studentName}`

    }


    // -------------------------------------------------------
    // FEE CONCESSION
    // -------------------------------------------------------

    else if (applicationType === 'Fee Concession') {

      application = `To,
The Principal,
${collegeName}

Subject: Application for Fee Concession

Respected Sir/Madam,

I am ${studentName}, a student of your college. I kindly request you to consider my application for fee concession because ${applicationReason}.

I request you to kindly consider my situation and grant me the necessary concession.

Thank you.

Yours faithfully,
${studentName}`

    }


    // -------------------------------------------------------
    // OTHER APPLICATION
    // -------------------------------------------------------

    else {

      application = `To,
The Principal,
${collegeName}

Subject: Application

Respected Sir/Madam,

I am ${studentName}, a student of your college. I am writing this application regarding ${applicationReason}.

I kindly request you to consider my request.

Thank you.

Yours faithfully,
${studentName}`

    }

    setApplicationResult(application)

    setTimeout(() => {

      const preview = document.getElementById(
        'application-preview-section'
      )

      if (preview) {
        preview.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }

    }, 100)
  }


  // =========================================================
  // DOWNLOAD APPLICATION PDF
  // =========================================================

  const downloadApplicationPDF = () => {

    const element = document.getElementById('application-pdf')

    if (!element) {
      alert('Please generate an application first.')
      return
    }

    const safeName =
      studentName
        .trim()
        .replace(/[^a-zA-Z0-9-_ ]/g, '')
        .replace(/\s+/g, '-')

    const safeType =
      applicationType
        .replace(/[^a-zA-Z0-9-_ ]/g, '')
        .replace(/\s+/g, '-')

    const options = {
      margin: 0,
      filename: `${safeName || 'Student'}-${safeType}.pdf`,
      image: {
        type: 'jpeg',
        quality: 0.98
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    }

    html2pdf()
      .set(options)
      .from(element)
      .save()
  }


  // =========================================================
  // COPY APPLICATION
  // =========================================================

  const copyApplication = async () => {

    if (!applicationResult) {
      return
    }

    try {

      await navigator.clipboard.writeText(
        applicationResult
      )

      alert('Application copied successfully!')

    } catch (error) {

      alert(
        'Unable to copy. Please select and copy manually.'
      )

    }
  }


  // =========================================================
  // CLEAR APPLICATION
  // =========================================================

  const clearApplication = () => {

    setApplicationResult('')
    setStudentName('')
    setCollegeName('')
    setApplicationReason('')

  }


  // =========================================================
  // SCHOLARSHIP FINDER
  // =========================================================

  const [scholarshipCategory, setScholarshipCategory] =
    useState('All')

  const scholarships = [

    {
      name: 'Post Matric Scholarship',
      category: 'College Students',
      description:
        'Scholarship opportunities for eligible students studying after Class 10.',
      icon: '🎓'
    },

    {
      name: 'Merit Scholarship',
      category: 'Merit',
      description:
        'Scholarship opportunities based on academic performance.',
      icon: '🏆'
    },

    {
      name: 'Engineering Student Scholarship',
      category: 'Engineering',
      description:
        'Scholarship opportunities for students pursuing engineering education.',
      icon: '⚙️'
    },

    {
      name: 'Diploma Student Scholarship',
      category: 'Diploma',
      description:
        'Scholarship opportunities for eligible diploma students.',
      icon: '📚'
    }

  ]

  const filteredScholarships =
    scholarshipCategory === 'All'
      ? scholarships
      : scholarships.filter(
          (scholarship) =>
            scholarship.category === scholarshipCategory
        )


  // =========================================================
  // AI STUDENT TOOLS
  // =========================================================

  const [aiTool, setAiTool] =
    useState('Study Plan')

  const [aiSubject, setAiSubject] =
    useState('')

  const [aiTopic, setAiTopic] =
    useState('')

  const [aiResult, setAiResult] =
    useState('')


  const generateAIPrompt = () => {

    if (
      aiSubject.trim() === '' ||
      aiTopic.trim() === ''
    ) {

      setAiResult(
        'Please enter subject and topic.'
      )

      return
    }

    let prompt = ''


    // -------------------------------------------------------
    // STUDY PLAN
    // -------------------------------------------------------

    if (aiTool === 'Study Plan') {

      prompt = `Create a detailed study plan for ${aiSubject}.

Topic: ${aiTopic}

Include:
1. Daily study schedule
2. Important concepts
3. Revision strategy
4. Practice questions
5. Exam preparation tips

Keep the explanation simple and student-friendly.`

    }


    // -------------------------------------------------------
    // EXPLAIN TOPIC
    // -------------------------------------------------------

    else if (aiTool === 'Explain Topic') {

      prompt = `Explain the following topic in very simple language.

Subject: ${aiSubject}

Topic: ${aiTopic}

Explain it step-by-step and include examples where useful.`

    }


    // -------------------------------------------------------
    // INTERVIEW QUESTIONS
    // -------------------------------------------------------

    else if (aiTool === 'Interview Questions') {

      prompt = `Create 20 interview questions with answers for a student preparing for a career in ${aiSubject}.

Focus on this topic:

${aiTopic}

Give beginner-friendly explanations.`

    }


    // -------------------------------------------------------
    // STUDY NOTES
    // -------------------------------------------------------

    else {

      prompt = `Create useful study notes for:

Subject: ${aiSubject}

Topic: ${aiTopic}

Include:
- Definitions
- Important points
- Examples
- Quick revision notes`

    }

    setAiResult(prompt)
  }


  // =========================================================
  // WEBSITE UI
  // =========================================================

  return (

    <div className="app">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="navbar">

        <div className="logo">

          <span className="logo-icon">
            🎓
          </span>

          <div className="logo-text">

            <strong>
              Student Utility Hub
            </strong>

            <small>
              Smart Tools for Students
            </small>

          </div>

        </div>


        <nav className="navbar-links">

          <a href="#home">
            Home
          </a>

          <a href="#tools">
            Tools
          </a>

          <a href="#about">
            About
          </a>

        </nav>

      </header>


      <main>

        {/* =====================================================
            HERO SECTION
        ===================================================== */}

        <section
          id="home"
          className="hero-section"
        >

          <div className="hero-content">

            <div className="hero-badge">
              <span>✦</span>
              FREE STUDENT PLATFORM
            </div>

            <h1>
              Everything Students Need

              <span>
                In One Place.
              </span>
            </h1>

            <p className="hero-text">
              Calculate marks, build professional resumes,
              generate applications, explore scholarships
              and create powerful AI prompts — all from
              one simple platform.
            </p>


            <div className="hero-actions">

              <a
                href="#tools"
                className="hero-button"
              >
                Explore Tools
                <span>→</span>
              </a>

              <a
                href="#about"
                className="hero-secondary-button"
              >
                Learn More
              </a>

            </div>


            <div className="hero-stats">

              <div className="hero-stat">

                <strong>
                  6+
                </strong>

                <span>
                  Student Tools
                </span>

              </div>


              <div className="hero-stat">

                <strong>
                  100%
                </strong>

                <span>
                  Free to Use
                </span>

              </div>


              <div className="hero-stat">

                <strong>
                  ⚡
                </strong>

                <span>
                  Fast & Simple
                </span>

              </div>

            </div>

          </div>


          <div className="hero-visual">

            <div className="hero-card">

              <div className="hero-card-top">

                <span className="hero-card-dot"></span>
                <span className="hero-card-dot"></span>
                <span className="hero-card-dot"></span>

              </div>

              <div className="hero-card-content">

                <div className="hero-mini-icon">
                  📊
                </div>

                <strong>
                  Student Dashboard
                </strong>

                <span>
                  Your essential tools are ready.
                </span>

                <div className="hero-mini-tools">

                  <div>📊 Percentage</div>
                  <div>📄 Resume</div>
                  <div>🎓 Scholarship</div>
                  <div>🤖 AI Tools</div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            TOOLS SECTION
        ===================================================== */}

        <section
          id="tools"
          className="tools-section"
        >

          <div className="section-heading">

            <div className="section-label">
              OUR TOOLKIT
            </div>

            <h2>
              Powerful Tools for Students
            </h2>

            <p>
              Everything you need for college, academics,
              career preparation and everyday student life.
            </p>

          </div>


          <div className="tools-grid">

            {/* =================================================
                PERCENTAGE CALCULATOR
            ================================================= */}

            <div className="tool-card percentage-card">

              <div className="tool-card-header">

                <div className="tool-icon">
                  📊
                </div>

                <span className="tool-tag">
                  ACADEMICS
                </span>

              </div>

              <h3>
                Percentage Calculator
              </h3>

              <p>
                Quickly calculate your percentage from
                obtained and total marks.
              </p>


              <div className="input-group">

                <label>
                  Obtained Marks
                </label>

                <input
                  type="number"
                  placeholder="e.g. 450"
                  value={obtained}
                  onChange={(event) =>
                    setObtained(event.target.value)
                  }
                />

              </div>


              <div className="input-group">

                <label>
                  Total Marks
                </label>

                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={totalMarks}
                  onChange={(event) =>
                    setTotalMarks(event.target.value)
                  }
                />

              </div>


              <button
                type="button"
                className="tool-button"
                onClick={calculatePercentage}
              >
                Calculate Percentage
                <span>→</span>
              </button>


              {percentageResult && (

                <div className="result-box">

                  <span>
                    Your Result
                  </span>

                  <strong>
                    {percentageResult}
                  </strong>

                </div>

              )}

            </div>


            {/* =================================================
                CGPA CALCULATOR
            ================================================= */}

            <div className="tool-card cgpa-card">

              <div className="tool-card-header">

                <div className="tool-icon">
                  🎯
                </div>

                <span className="tool-tag">
                  ACADEMICS
                </span>

              </div>

              <h3>
                CGPA Calculator
              </h3>

              <p>
                Calculate your average CGPA from multiple
                semester scores.
              </p>


              <div className="input-group">

                <label>
                  Semester CGPAs
                </label>

                <input
                  type="text"
                  placeholder="8.2, 8.5, 8.7"
                  value={cgpaInput}
                  onChange={(event) =>
                    setCgpaInput(event.target.value)
                  }
                />

              </div>


              <div className="input-hint">
                Separate multiple CGPAs using commas.
              </div>


              <button
                type="button"
                className="tool-button"
                onClick={calculateCGPA}
              >
                Calculate CGPA
                <span>→</span>
              </button>


              {cgpaResult && (

                <div className="result-box">

                  <span>
                    Average CGPA
                  </span>

                  <strong>
                    {cgpaResult}
                  </strong>

                </div>

              )}

            </div>


            {/* =================================================
                RESUME MAKER
            ================================================= */}

            <div className="tool-card resume-card premium-card">

              <div className="tool-card-header">

                <div className="tool-icon">
                  📄
                </div>

                <span className="tool-tag premium-tag">
                  CAREER
                </span>

              </div>

              <h3>
                Professional Resume Maker
              </h3>

              <p>
                Create a clean professional resume and
                download it as a PDF.
              </p>


              <div className="form-grid">

                <div className="input-group">

                  <label>
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={resume.name}
                    onChange={handleResumeChange}
                  />

                </div>


                <div className="input-group">

                  <label>
                    Email Address *
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={resume.email}
                    onChange={handleResumeChange}
                  />

                </div>


                <div className="input-group">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={resume.phone}
                    onChange={handleResumeChange}
                  />

                </div>


                <div className="input-group">

                  <label>
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    placeholder="City, State"
                    value={resume.location}
                    onChange={handleResumeChange}
                  />

                </div>

              </div>


              <div className="input-group">

                <label>
                  Career Objective
                </label>

                <textarea
                  name="summary"
                  placeholder="Write a short professional summary..."
                  value={resume.summary}
                  onChange={handleResumeChange}
                  rows="4"
                />

              </div>


              <div className="input-group">

                <label>
                  Education
                </label>

                <input
                  type="text"
                  name="education"
                  placeholder="Diploma / Degree / College"
                  value={resume.education}
                  onChange={handleResumeChange}
                />

              </div>


              <div className="input-group">

                <label>
                  Skills
                </label>

                <input
                  type="text"
                  name="skills"
                  placeholder="HTML, CSS, JavaScript, React..."
                  value={resume.skills}
                  onChange={handleResumeChange}
                />

              </div>


              <div className="input-group">

                <label>
                  Projects
                </label>

                <input
                  type="text"
                  name="projects"
                  placeholder="Your projects"
                  value={resume.projects}
                  onChange={handleResumeChange}
                />

              </div>


              <div className="input-group">

                <label>
                  Experience
                </label>

                <input
                  type="text"
                  name="experience"
                  placeholder="Fresher / Internship / Experience"
                  value={resume.experience}
                  onChange={handleResumeChange}
                />

              </div>


              <button
                type="button"
                className="tool-button premium-button"
                onClick={generateResume}
              >
                Generate Professional Resume
                <span>→</span>
              </button>

            </div>


            {/* =================================================
                APPLICATION GENERATOR
            ================================================= */}

            <div className="tool-card application-card premium-card">

              <div className="tool-card-header">

                <div className="tool-icon">
                  📝
                </div>

                <span className="tool-tag">
                  DOCUMENTS
                </span>

              </div>


              <h3>
                Application Generator
              </h3>

              <p>
                Generate professional college and school
                applications instantly.
              </p>


              <div className="input-group">

                <label>
                  Application Type
                </label>

                <select
                  value={applicationType}
                  onChange={(event) =>
                    setApplicationType(event.target.value)
                  }
                >

                  <option value="Leave Application">
                    Leave Application
                  </option>

                  <option value="Bonafide Certificate">
                    Bonafide Certificate
                  </option>

                  <option value="Fee Concession">
                    Fee Concession
                  </option>

                  <option value="Other Application">
                    Other Application
                  </option>

                </select>

              </div>


              <div className="input-group">

                <label>
                  Student Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={studentName}
                  onChange={(event) =>
                    setStudentName(event.target.value)
                  }
                />

              </div>


              <div className="input-group">

                <label>
                  College / School Name
                </label>

                <input
                  type="text"
                  placeholder="Enter institution name"
                  value={collegeName}
                  onChange={(event) =>
                    setCollegeName(event.target.value)
                  }
                />

              </div>


              <div className="input-group">

                <label>
                  Reason / Purpose
                </label>

                <textarea
                  placeholder="Enter your reason or purpose..."
                  value={applicationReason}
                  onChange={(event) =>
                    setApplicationReason(event.target.value)
                  }
                  rows="5"
                />

              </div>


              <button
                type="button"
                className="tool-button"
                onClick={generateApplication}
              >
                Generate Application
                <span>→</span>
              </button>

            </div>


            {/* =================================================
                SCHOLARSHIP FINDER
            ================================================= */}

            <div className="tool-card scholarship-card premium-card">

              <div className="tool-card-header">

                <div className="tool-icon">
                  🎓
                </div>

                <span className="tool-tag">
                  SCHOLARSHIPS
                </span>

              </div>


              <h3>
                Scholarship Finder
              </h3>

              <p>
                Explore useful scholarship categories
                for students.
              </p>


              <div className="input-group">

                <label>
                  Scholarship Category
                </label>

                <select
                  value={scholarshipCategory}
                  onChange={(event) =>
                    setScholarshipCategory(event.target.value)
                  }
                >

                  <option value="All">
                    All Scholarships
                  </option>

                  <option value="College Students">
                    College Students
                  </option>

                  <option value="Merit">
                    Merit
                  </option>

                  <option value="Engineering">
                    Engineering
                  </option>

                  <option value="Diploma">
                    Diploma
                  </option>

                </select>

              </div>


              <div className="scholarship-list">

                {filteredScholarships.length > 0 ? (

                  filteredScholarships.map(
                    (scholarship, index) => (

                      <div
                        className="scholarship-item"
                        key={index}
                      >

                        <div className="scholarship-icon">
                          {scholarship.icon}
                        </div>

                        <div className="scholarship-content">

                          <h4>
                            {scholarship.name}
                          </h4>

                          <span>
                            {scholarship.category}
                          </span>

                          <p>
                            {scholarship.description}
                          </p>

                        </div>

                      </div>

                    )
                  )

                ) : (

                  <div className="empty-state">
                    No scholarships found.
                  </div>

                )}

              </div>

            </div>


            {/* =================================================
                AI STUDENT TOOLS
            ================================================= */}

            <div className="tool-card ai-card premium-card">

              <div className="tool-card-header">

                <div className="tool-icon">
                  🤖
                </div>

                <span className="tool-tag ai-tag">
                  AI TOOLS
                </span>

              </div>


              <h3>
                AI Student Tools
              </h3>

              <p>
                Create ready-to-use AI prompts for studying,
                exams and career preparation.
              </p>


              <div className="input-group">

                <label>
                  Choose AI Tool
                </label>

                <select
                  value={aiTool}
                  onChange={(event) =>
                    setAiTool(event.target.value)
                  }
                >

                  <option value="Study Plan">
                    Study Plan
                  </option>

                  <option value="Explain Topic">
                    Explain Topic
                  </option>

                  <option value="Interview Questions">
                    Interview Questions
                  </option>

                  <option value="Study Notes">
                    Study Notes
                  </option>

                </select>

              </div>


              <div className="input-group">

                <label>
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="e.g. JavaScript"
                  value={aiSubject}
                  onChange={(event) =>
                    setAiSubject(event.target.value)
                  }
                />

              </div>


              <div className="input-group">

                <label>
                  Topic
                </label>

                <input
                  type="text"
                  placeholder="e.g. React Hooks"
                  value={aiTopic}
                  onChange={(event) =>
                    setAiTopic(event.target.value)
                  }
                />

              </div>


              <button
                type="button"
                className="tool-button ai-button"
                onClick={generateAIPrompt}
              >
                Generate AI Prompt
                <span>→</span>
              </button>


              {aiResult && (

                <div className="generated-result">

                  <div className="generated-result-header">

                    <span>
                      Generated Prompt
                    </span>

                    <span>
                      ✨ AI Ready
                    </span>

                  </div>

                  <textarea
                    className="generated-text"
                    value={aiResult}
                    readOnly
                  />

                </div>

              )}

            </div>

          </div>


          {/* =====================================================
              APPLICATION PREVIEW
          ===================================================== */}

          {applicationResult && (

            <div
              id="application-preview-section"
              className="application-preview-section"
            >

              <div className="application-preview-card">

                <div className="application-preview-header">

                  <div>

                    <span className="preview-label">
                      GENERATED DOCUMENT
                    </span>

                    <h3>
                      📄 {applicationType}
                    </h3>

                  </div>

                  <span className="preview-status">
                    ✓ READY
                  </span>

                </div>


                {/* =================================================
                    IMPORTANT FIX:
                    ID APPLICATION-PDF IS NOW ON THE REAL DOCUMENT
                    NO EMPTY NESTED DIV
                ================================================= */}

                <div
                  id="application-pdf"
                  className="application-document"
                >

                  <div className="document-brand">

                    <div className="document-brand-icon">
                      🎓
                    </div>

                    <div>

                      <strong>
                        Student Utility Hub
                      </strong>

                      <small>
                        Student Document Generator
                      </small>

                    </div>

                  </div>


                  <div className="document-top-line"></div>


                  <div className="document-title">
                    {applicationType}
                  </div>


                  <pre className="application-text">
                    {applicationResult}
                  </pre>


                  <div className="document-bottom-line"></div>


                  <div className="document-footer">

                    <span>
                      Generated by Student Utility Hub
                    </span>

                    <span>
                      {new Date().toLocaleDateString()}
                    </span>

                  </div>

                </div>


                <div className="application-actions">

                  <button
                    type="button"
                    className="application-pdf-button"
                    onClick={downloadApplicationPDF}
                  >
                    📥 Download PDF
                  </button>


                  <button
                    type="button"
                    className="application-copy-button"
                    onClick={copyApplication}
                  >
                    📋 Copy Application
                  </button>


                  <button
                    type="button"
                    className="application-clear-button"
                    onClick={clearApplication}
                  >
                    🗑️ Clear
                  </button>

                </div>

              </div>

            </div>

          )}


          {/* =====================================================
              RESUME PREVIEW
          ===================================================== */}

          {resumeGenerated && (

            <div
              id="resume-preview-section"
              className="resume-preview-section"
            >

              <div className="resume-preview-wrapper">

                <div className="preview-topbar">

                  <div>

                    <span className="preview-label">
                      RESUME PREVIEW
                    </span>

                    <h3>
                      Your Professional Resume
                    </h3>

                  </div>

                  <span className="preview-status">
                    ✓ READY
                  </span>

                </div>


                <div
                  id="resume-pdf"
                  className="resume-preview"
                >

                  {/* RESUME HEADER */}

                  <div className="resume-header">

                    <h1>
                      {resume.name}
                    </h1>

                    <p>

                      {resume.email}

                      {resume.phone &&
                        ` | ${resume.phone}`}

                      {resume.location &&
                        ` | ${resume.location}`}

                    </p>

                  </div>


                  {/* PROFILE */}

                  {resume.summary && (

                    <div className="resume-section">

                      <h3>
                        PROFILE
                      </h3>

                      <p className="resume-content-text">
                        {resume.summary}
                      </p>

                    </div>

                  )}


                  {/* EDUCATION */}

                  {resume.education && (

                    <div className="resume-section">

                      <h3>
                        EDUCATION
                      </h3>

                      <p className="resume-content-text">
                        {resume.education}
                      </p>

                    </div>

                  )}


                  {/* SKILLS */}

                  {resume.skills && (

                    <div className="resume-section">

                      <h3>
                        SKILLS
                      </h3>

                      <p className="resume-content-text">
                        {resume.skills}
                      </p>

                    </div>

                  )}


                  {/* PROJECTS */}

                  {resume.projects && (

                    <div className="resume-section">

                      <h3>
                        PROJECTS
                      </h3>

                      <p className="resume-content-text">
                        {resume.projects}
                      </p>

                    </div>

                  )}


                  {/* EXPERIENCE */}

                  {resume.experience && (

                    <div className="resume-section">

                      <h3>
                        EXPERIENCE
                      </h3>

                      <p className="resume-content-text">
                        {resume.experience}
                      </p>

                    </div>

                  )}

                </div>


                <div className="resume-preview-actions">

                  <button
                    type="button"
                    className="download-pdf-button"
                    onClick={downloadResumePDF}
                  >
                    📥 Download Resume PDF
                  </button>

                </div>

              </div>

            </div>

          )}

        </section>


        {/* =====================================================
            ABOUT SECTION
        ===================================================== */}

        <section
          id="about"
          className="about-section"
        >

          <div className="section-heading">

            <div className="section-label">
              ABOUT THE PLATFORM
            </div>

            <h2>
              Built for Students, Made Simple.
            </h2>

            <p>
              Student Utility Hub brings useful academic,
              career and productivity tools together in
              one convenient platform.
            </p>

          </div>


          <div className="features">

            <div className="feature-card">

              <span>
                ⚡
              </span>

              <strong>
                Fast & Simple
              </strong>

              <p>
                Get your work done quickly without
                complicated interfaces.
              </p>

            </div>


            <div className="feature-card">

              <span>
                🆓
              </span>

              <strong>
                Free to Use
              </strong>

              <p>
                Useful student tools available without
                unnecessary complexity.
              </p>

            </div>


            <div className="feature-card">

              <span>
                📱
              </span>

              <strong>
                Mobile Friendly
              </strong>

              <p>
                Designed to work smoothly across phones,
                tablets and computers.
              </p>

            </div>


            <div className="feature-card">

              <span>
                🔒
              </span>

              <strong>
                Safe & Easy
              </strong>

              <p>
                Simple tools with a clean and easy-to-use
                experience.
              </p>

            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer>

        <div className="footer-content">

          <div className="footer-brand">

            <strong>
              🎓 Student Utility Hub
            </strong>

            <p>
              Smart, simple and useful tools for students.
            </p>

          </div>


          <div className="footer-links">

            <a href="#home">
              Home
            </a>

            <a href="#tools">
              Tools
            </a>

            <a href="#about">
              About
            </a>

          </div>

        </div>


        <div className="footer-bottom">

          <p>
            © 2026 Student Utility Hub. All rights reserved.
          </p>

          <span>
            Built for Students ❤️
          </span>

        </div>

      </footer>

    </div>
  )
}

export default App