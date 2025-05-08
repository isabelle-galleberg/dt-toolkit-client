# DT Toolkit — Client
This code was developed as part of the master’s thesis by [@isabelle-galleberg](https://github.com/isabelle-galleberg) and [@evateis](https://github.com/evateis).

This repository contains the **frontend application**, built using [React](https://reactjs.org/) and [Vite](https://vitejs.dev/).

## 💡 Project Overview
**DT Toolkit** is a digital toolkit developed to support Design Thinking (DT) workshops focused on educating K–12 students about phishing scams. It provides interactive, structured activities that guide students through the stages of the Design Thinking process. The toolkit is intended for use by educators or facilitators leading workshops and aims to promote critical thinking, creativity, and cybersecurity awareness among young learners.


## 💻 Project setup
Follow the steps below to set up and run the frontend application locally.

### 1. Clone the repository
<div class="copy-box">
  <pre><code>git clone https://github.com/isabelle-galleberg/dt-toolkit-client.git</code></pre>
  <button class="copy-btn" onclick="navigator.clipboard.writeText('git clone https://github.com/isabelle-galleberg/dt-toolkit-client.git')"></button>
</div>

### 2. Install Dependencies 
Navigate to the root folder of the project and run the following command to install dependencies. 

<div class="copy-box">
  <pre><code>npm install</code></pre>
  <button class="copy-btn" onclick="navigator.clipboard.writeText('npm install')"></button>
</div>


### 3. Create Environment File
Create a .env file in the root directory and add the following:

<div class="copy-box">
  <pre><code>VITE_API_URL=your-api-endpoint</code></pre>
  <button class="copy-btn" onclick="navigator.clipboard.writeText('VITE_API_URL=<your-api-endpoint>')"></button>
</div>

Replace `your-api-endpoint` with the actual backend API URL.


### 4. Run in Development Mode 
<div class="copy-box">
  <pre><code>npm run dev</code></pre>
  <button class="copy-btn" onclick="navigator.clipboard.writeText('npm run dev')"></button>
</div>


Open [http://localhost:5137](http://localhost:5137) to view it in the browser.

### 5. Build for Production
<div class="copy-box">
  <pre><code>npm run build</code></pre>
  <button class="copy-btn" onclick="navigator.clipboard.writeText('npm run build')"></button>
</div>

