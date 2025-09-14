(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();class d{constructor(){this.currentUser=null,this.currentTab="view-class",this.classes=["B.Pharm I Year","B.Pharm II Year","B.Pharm III Year","B.Pharm IV Year","Pharm.D I Year","Pharm.D II Year"],this.staff=["Dr. Ramesh Kumar","Dr. Priya Sharma","Prof. Suresh Singh","Dr. Anita Reddy","Prof. Vijay Kumar","Dr. Lakshmi Devi"],this.timetables={},this.substitutions=[],this.days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],this.timeSlots=["1","2","3","4","5","6","7","8","9","10","11","12"],this.init()}init(){this.loadData(),this.render(),this.setupEventListeners(),this.initializeSampleData()}initializeSampleData(){Object.keys(this.timetables).length===0&&(this.classes.forEach(t=>{this.timetables[t]=this.days.map(()=>this.timeSlots.map(()=>"-"))}),this.staff.forEach(t=>{this.timetables[t]=this.days.map(()=>this.timeSlots.map(()=>"Free"))}),this.timetables["B.Pharm I Year"][0][0]="Pharmaceutics - Dr. Ramesh Kumar",this.timetables["B.Pharm I Year"][0][1]="Pharmaceutical Chemistry - Dr. Priya Sharma",this.timetables["Dr. Ramesh Kumar"][0][0]="B.Pharm I Year - Pharmaceutics",this.timetables["Dr. Priya Sharma"][0][1]="B.Pharm I Year - Pharmaceutical Chemistry",this.saveData())}loadData(){const t=localStorage.getItem("kvsrTimetableData");if(t){const e=JSON.parse(t);this.classes=e.classes||this.classes,this.staff=e.staff||this.staff,this.timetables=e.timetables||{},this.substitutions=e.substitutions||[]}}saveData(){localStorage.setItem("kvsrTimetableData",JSON.stringify({classes:this.classes,staff:this.staff,timetables:this.timetables,substitutions:this.substitutions}))}render(){const t=document.getElementById("app");t.innerHTML=this.renderMainApp(),this.renderTabContent()}renderMainApp(){return`
          <div class="app-container">
            <div class="header">
              <h1>🎓 KVSR Siddhartha College of Pharmaceutical Sciences</h1>
              <p>Professional Timetable Management System</p>
              ${this.currentUser?`<div style="position: absolute; top: 24px; right: 24px;">
                  <span style="color: #2d5016; font-weight: 500;">Welcome, ${this.currentUser}</span>
                  <button class="logout-btn" onclick="app.logout()">Logout</button>
                </div>`:'<button class="login-btn" onclick="app.showLogin()">Admin Login</button>'}
            </div>
            <div class="main-content">
              <div class="tabs">
                <button class="tab ${this.currentTab==="view-class"?"active":""}" onclick="app.switchTab('view-class')">
                  📚 View Class Timetables
                </button>
                <button class="tab ${this.currentTab==="view-staff"?"active":""}" onclick="app.switchTab('view-staff')">
                  👨‍🏫 View Staff Timetables
                </button>
                ${this.currentUser?`
                  <button class="tab ${this.currentTab==="edit"?"active":""}" onclick="app.switchTab('edit')">
                    ✏️ Edit Timetables
                  </button>
                  <button class="tab ${this.currentTab==="substitution"?"active":""}" onclick="app.switchTab('substitution')">
                    🔄 Substitutions
                  </button>
                  <button class="tab ${this.currentTab==="free-staff"?"active":""}" onclick="app.switchTab('free-staff')">
                    ⏰ Free Staff
                  </button>
                  <button class="tab ${this.currentTab==="manage"?"active":""}" onclick="app.switchTab('manage')">
                    ⚙️ Manage
                  </button>
                `:""}
              </div>
              <div id="tab-content"></div>
            </div>
          </div>
          ${this.showLoginModal?this.renderLoginModal():""}
        `}renderLoginModal(){return`
          <div class="login-modal">
            <div class="login-form">
              <h2>Admin Login</h2>
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" placeholder="Enter username">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Enter password">
              </div>
              <button class="btn" onclick="app.login()">Login</button>
              <button class="btn btn-secondary" onclick="app.hideLogin()">Cancel</button>
            </div>
          </div>
        `}renderTabContent(){const t=document.getElementById("tab-content");switch(this.currentTab){case"view-class":t.innerHTML=this.renderViewClassTab();break;case"view-staff":t.innerHTML=this.renderViewStaffTab();break;case"edit":t.innerHTML=this.renderEditTab();break;case"substitution":t.innerHTML=this.renderSubstitutionTab();break;case"free-staff":t.innerHTML=this.renderFreeStaffTab();break;case"manage":t.innerHTML=this.renderManageTab();break}}renderViewClassTab(){return`
          <div class="tab-content active">
            <div class="section-header">
              <h3>Class Timetables</h3>
            </div>
            <div class="selector-group">
              <select id="class-select">
                ${this.classes.map(t=>`<option value="${t}">${t}</option>`).join("")}
              </select>
              <button class="btn" onclick="app.viewTimetable('class')" style="width: auto;">
                Show Timetable
              </button>
            </div>
            <div id="timetable-display"></div>
          </div>
        `}renderViewStaffTab(){return`
          <div class="tab-content active">
            <div class="section-header">
              <h3>Staff Timetables</h3>
            </div>
            <div class="selector-group">
              <select id="staff-select">
                ${this.staff.map(t=>`<option value="${t}">${t}</option>`).join("")}
              </select>
              <button class="btn" onclick="app.viewTimetable('staff')" style="width: auto;">
                Show Timetable
              </button>
            </div>
            <div id="timetable-display"></div>
          </div>
        `}renderEditTab(){return`
          <div class="tab-content active">
            <div class="section-header">
              <h3>Edit Timetables</h3>
            </div>
            <div class="selector-group">
              <select id="edit-type">
                <option value="class">Class</option>
                <option value="staff">Staff</option>
              </select>
              <select id="edit-select">
                ${this.classes.map(t=>`<option value="${t}">${t}</option>`).join("")}
              </select>
              <button class="btn" onclick="app.editTimetable()" style="width: auto;">
                Edit Timetable
              </button>
            </div>
            <div id="edit-display"></div>
          </div>
        `}renderSubstitutionTab(){return`
          <div class="tab-content active">
            <div class="section-header">
              <h3>Teacher Substitutions</h3>
            </div>
            <div class="substitution-form">
              <h4>Assign Substitution</h4>
              <div class="form-row">
                <div class="form-group">
                  <label>Absent Teacher</label>
                  <select id="absent-teacher">
                    ${this.staff.map(t=>`<option value="${t}">${t}</option>`).join("")}
                  </select>
                </div>
                <div class="form-group">
                  <label>Day</label>
                  <select id="sub-day">
                    ${this.days.map((t,e)=>`<option value="${e}">${t}</option>`).join("")}
                  </select>
                </div>
                <div class="form-group">
                  <label>Time Slot</label>
                  <select id="sub-slot">
                    ${this.timeSlots.map((t,e)=>`<option value="${e}">${t}</option>`).join("")}
                  </select>
                </div>
                <button class="btn" onclick="app.findSubstitute()" style="width: auto;">
                  Find Substitute
                </button>
              </div>
              <div id="substitute-options"></div>
            </div>
            <div id="substitution-list">
              <h4>Active Substitutions</h4>
              ${this.substitutions.map((t,e)=>`
                <div class="item-row">
                  <span>${t.absentTeacher} → ${t.substituteTeacher} (${this.days[t.day]}, ${this.timeSlots[t.slot]})</span>
                  <button class="remove-btn" onclick="app.removeSubstitution(${e})">Remove</button>
                </div>
              `).join("")}
            </div>
          </div>
        `}renderFreeStaffTab(){return`
          <div class="tab-content active">
            <div class="section-header">
              <h3>Free Staff Schedule</h3>
            </div>
            <div class="selector-group">
              <select id="free-day">
                ${this.days.map((t,e)=>`<option value="${e}">${t}</option>`).join("")}
              </select>
              <select id="free-slot">
                ${this.timeSlots.map((t,e)=>`<option value="${e}">${t}</option>`).join("")}
              </select>
              <button class="btn" onclick="app.showFreeStaff()" style="width: auto;">
                Show Free Staff
              </button>
            </div>
            <div id="free-staff-display"></div>
          </div>
        `}renderManageTab(){return`
          <div class="tab-content active">
            <div class="section-header">
              <h3>Manage Classes & Staff</h3>
            </div>
            <div class="management-grid">
              <div class="management-section">
                <h4>Classes</h4>
                <div class="form-group">
                  <input type="text" id="new-class" placeholder="New class name">
                  <button class="btn" onclick="app.addClass()" style="margin-top: 8px;">Add Class</button>
                </div>
                <div class="item-list">
                  ${this.classes.map(t=>`
                    <div class="item-row">
                      <span>${t}</span>
                      <button class="remove-btn" onclick="app.removeClass('${t}')">Remove</button>
                    </div>
                  `).join("")}
                </div>
              </div>
              <div class="management-section">
                <h4>Staff</h4>
                <div class="form-group">
                  <input type="text" id="new-staff" placeholder="New staff name">
                  <button class="btn" onclick="app.addStaff()" style="margin-top: 8px;">Add Staff</button>
                </div>
                <div class="item-list">
                  ${this.staff.map(t=>`
                    <div class="item-row">
                      <span>${t}</span>
                      <button class="remove-btn" onclick="app.removeStaff('${t}')">Remove</button>
                    </div>
                  `).join("")}
                </div>
              </div>
            </div>
          </div>
        `}setupEventListeners(){document.addEventListener("keypress",t=>{t.key==="Enter"&&this.showLoginModal&&this.login()}),document.addEventListener("change",t=>{if(t.target.id==="edit-type"){const e=document.getElementById("edit-select"),s=t.target.value==="class"?this.classes:this.staff;e.innerHTML=s.map(a=>`<option value="${a}">${a}</option>`).join("")}})}showLogin(){this.showLoginModal=!0,this.render()}hideLogin(){this.showLoginModal=!1,this.render()}login(){var i,s;const t=(i=document.getElementById("username"))==null?void 0:i.value,e=(s=document.getElementById("password"))==null?void 0:s.value;t==="Principal"&&e==="admin123"||t==="committee"&&e==="committee123"?(this.currentUser=t,this.showLoginModal=!1,this.showNotification("Login successful!","success"),this.render()):this.showNotification("Invalid credentials!","error")}logout(){this.currentUser=null,this.currentTab="view-class",this.render()}switchTab(t){this.currentTab=t,this.render()}viewTimetable(t){const i=document.getElementById(`${t}-select`).value;this.displayTimetable(i,!1)}editTimetable(){document.getElementById("edit-type");const e=document.getElementById("edit-select").value;this.displayTimetable(e,!0)}displayTimetable(t,e=!1){this.timetables[t]||(this.timetables[t]=this.days.map(()=>this.timeSlots.map(()=>"-")));const i=e?document.getElementById("edit-display"):document.getElementById("timetable-display"),s=this.timetables[t];let a=`
          <div class="timetable-grid">
            <h4>${t} Timetable</h4>
            <table class="timetable">
              <thead>
                <tr>
                  <th>Day / Time</th>
                  ${this.timeSlots.map(n=>`<th>${n}</th>`).join("")}
                </tr>
              </thead>
              <tbody>
                ${s.map((n,o)=>`
                  <tr>
                    <th>${this.days[o]}</th>
                    ${n.map((l,r)=>`
                      <td>
                        ${e?`<input type="text" value="${l}" 
                           onchange="app.updateCell('${t}', ${o}, ${r}, this.value)"
                           placeholder="Subject/Teacher">`:l}
                      </td>
                    `).join("")}
                  </tr>
                `).join("")}
              </tbody>
            </table>
            ${e?`<button class="btn" onclick="app.saveTimetable('${t}')" style="margin-top: 16px; width: auto;">Save Changes</button>`:""}
          </div>
        `;i.innerHTML=a}updateCell(t,e,i,s){this.timetables[t]||(this.timetables[t]=this.days.map(()=>this.timeSlots.map(()=>"-"))),this.timetables[t][e][i]=s}saveTimetable(t){this.saveData(),this.showNotification("Timetable saved successfully!","success")}findSubstitute(){const t=document.getElementById("absent-teacher").value,e=parseInt(document.getElementById("sub-day").value),i=parseInt(document.getElementById("sub-slot").value),s=this.staff.filter(n=>{if(n===t)return!1;const o=this.timetables[n];return o?o[e][i]==="Free"||o[e][i]==="-":!0}),a=document.getElementById("substitute-options");s.length>0?a.innerHTML=`
            <h4>Available Substitutes:</h4>
            <div class="selector-group">
              <select id="substitute-teacher">
                ${s.map(n=>`<option value="${n}">${n}</option>`).join("")}
              </select>
              <button class="btn" onclick="app.assignSubstitute()" style="width: auto;">Assign Substitute</button>
            </div>
          `:a.innerHTML='<p style="color: #dc3545;">No teachers available for substitution at this time.</p>'}assignSubstitute(){const t=document.getElementById("absent-teacher").value,e=document.getElementById("substitute-teacher").value,i=parseInt(document.getElementById("sub-day").value),s=parseInt(document.getElementById("sub-slot").value);this.substitutions.push({absentTeacher:t,substituteTeacher:e,day:i,slot:s,date:new Date().toLocaleDateString()}),this.saveData(),this.showNotification("Substitute assigned successfully!","success"),this.renderTabContent()}removeSubstitution(t){this.substitutions.splice(t,1),this.saveData(),this.renderTabContent()}showFreeStaff(){const t=parseInt(document.getElementById("free-day").value),e=parseInt(document.getElementById("free-slot").value),i=this.staff.filter(a=>{const n=this.timetables[a];return n?n[t][e]==="Free"||n[t][e]==="-":!0}),s=document.getElementById("free-staff-display");s.innerHTML=`
          <div class="free-teachers">
            <h4>Free Staff on ${this.days[t]} at ${this.timeSlots[e]}:</h4>
            ${i.length>0?i.map(a=>`<span class="teacher-chip">${a}</span>`).join(""):"<p>No staff members are free at this time.</p>"}
          </div>
        `}addClass(){const t=document.getElementById("new-class"),e=t.value.trim();e&&!this.classes.includes(e)&&(this.classes.push(e),this.timetables[e]=this.days.map(()=>this.timeSlots.map(()=>"-")),t.value="",this.saveData(),this.renderTabContent(),this.showNotification("Class added successfully!","success"))}removeClass(t){this.classes=this.classes.filter(e=>e!==t),delete this.timetables[t],this.saveData(),this.renderTabContent(),this.showNotification("Class removed successfully!","success")}addStaff(){const t=document.getElementById("new-staff"),e=t.value.trim();e&&!this.staff.includes(e)&&(this.staff.push(e),this.timetables[e]=this.days.map(()=>this.timeSlots.map(()=>"Free")),t.value="",this.saveData(),this.renderTabContent(),this.showNotification("Staff added successfully!","success"))}removeStaff(t){this.staff=this.staff.filter(e=>e!==t),delete this.timetables[t],this.saveData(),this.renderTabContent(),this.showNotification("Staff removed successfully!","success")}showNotification(t,e="success"){const i=document.createElement("div");i.className=`notification ${e}`,i.textContent=t,document.body.appendChild(i),setTimeout(()=>i.classList.add("show"),100),setTimeout(()=>{i.classList.remove("show"),setTimeout(()=>document.body.removeChild(i),300)},3e3)}}window.app=new d;
