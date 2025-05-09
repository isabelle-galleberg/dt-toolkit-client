# DT Toolkit — Client
This code was developed as part of the master’s thesis by [@isabelle-galleberg](https://github.com/isabelle-galleberg) and [@evateis](https://github.com/evateis).

This repository contains the **frontend application**, built using [React](https://reactjs.org/) and [Vite](https://vitejs.dev/), styled with [Tailwind CSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/).

## 💡 Project Overview
**DT Toolkit** is a digital toolkit developed to support a Design Thinking (DT) workshop focused on educating K–12 students about phishing scams. It provides interactive, structured activities that guide students through the stages of the Design Thinking process. The toolkit is intended for use by educators or facilitators leading workshops and aims to promote critical thinking, creativity, and cybersecurity awareness among young learners.


## 💻 Project setup
Follow the steps below to set up and run the frontend application locally.

### 1. Clone the repository

<div class="copy-box">
  <pre><code>git clone https://github.com/isabelle-galleberg/dt-toolkit-client.git</code></pre>
  <button class="copy-btn" onclick="navigator.clipboard.writeText('git clone https://github.com/isabelle-galleberg/dt-toolkit-client.git')"></button>
</div>

### 2. Install Dependencies 
Navigate to the project folder and install dependencies:

<div class="copy-box">
  <pre><code>npm install</code></pre>
  <button class="copy-btn" onclick="navigator.clipboard.writeText('npm install')"></button>
</div>


### 3. Create Environment File
Create a `.env` file in the root directory and add the following:

<div class="copy-box">
  <pre><code>VITE_API_URL=your-api-endpoint</code></pre>
  <button class="copy-btn" onclick="navigator.clipboard.writeText('VITE_API_URL=<your-api-endpoint>')"></button>
</div>

Replace `your-api-endpoint` with the actual backend API URL. <br><br>

### 4. (Optional) Enable PostHog Analytics
If you want to enable event tracking and analytics via PostHog, add the following variables to your `.env` file:

<pre lang="markdown">
VITE_POSTHOG_WS_TOKEN=your-websocket-token  
VITE_PUBLIC_POSTHOG_KEY=your-public-key  
VITE_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com  
</pre>

Replace each value with your actual PostHog credentials.  

PostHog is used to track anonymous user interactions to help improve the toolkit experience. These variables are optional and the application will run without them.  <br><br>



### 5. Start Development Server
<div class="copy-box">
  <pre><code>npm run dev</code></pre>
  <button class="copy-btn" onclick="navigator.clipboard.writeText('npm run dev')"></button>
</div>


Open [http://localhost:5137](http://localhost:5137) to view it in your browser.<br><br>

### 6. Build for Production
The output will be placed in the `dist/` folder. 
<div class="copy-box">
  <pre><code>npm run build</code></pre>
  <button class="copy-btn" onclick="navigator.clipboard.writeText('npm run build')"></button>
</div>

