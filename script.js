document.addEventListener('DOMContentLoaded', () => {

    // --- 數據模擬 ---
    const MOCK_DATA = {
        user: { id: "user123", username: "demo", points: 1250, level: "Silver", totalUploads: 15, totalEarnings: 125.50, achievements: ["first_upload", "data_contributor"] },
        uploads: [
            { id: "upload015", action: "Open Door", filename: "opening_the_front_door.mp4", uploadDate: "2025-07-13T10:00:00Z", status: "Approved", points: 70, earnings: 7.00 },
            { id: "upload014", action: "Vacuum Floor", filename: "living_room_vacuum.mov", uploadDate: "2025-07-12T15:20:00Z", status: "Approved", points: 50, earnings: 5.00 },
            { id: "upload013", action: "Wash Dishes", filename: "kitchen_sink_dishes.mp4", uploadDate: "2025-07-11T09:05:00Z", status: "Needs Revision", points: 0, earnings: 0.00 },
            { id: "upload012", action: "Wipe Table", filename: "dining_table_cleaning.avi", uploadDate: "2025-07-10T18:45:00Z", status: "Approved", points: 80, earnings: 8.00 },
            { id: "upload011", action: "Water Plants", filename: "watering_balcony_flower.mp4", uploadDate: "2025-07-09T11:30:00Z", status: "Under Review", points: 0, earnings: 0.00 },
        ],
        actions: [
            { id: "open_door", name: "開門", nameEn: "Open Door", color: "#e74c3c", icon: "fa-door-open" },
            { id: "vacuum_floor", name: "吸地板", nameEn: "Vacuum Floor", color: "#3498db", icon: "fa-broom" },
            { id: "wash_dishes", name: "洗碗", nameEn: "Wash Dishes", color: "#2ecc71", icon: "fa-faucet" },
            { id: "wipe_table", name: "擦桌子", nameEn: "Wipe Table", color: "#f39c12", icon: "fa-eraser" },
            { id: "water_plants", name: "澆花", nameEn: "Water Plants", color: "#9b59b6", icon: "fa-seedling" }
        ],
        achievements: [ { id: "first_upload", name: "首次上傳", icon: "fa-rocket" }, { id: "data_contributor", name: "資料貢獻者", icon: "fa-database" }, { id: "quality_creator", name: "優質內容創作者", icon: "fa-star" }, ],
        levels: [ { name: "Bronze", icon: "fa-award", color: "#cd7f32" }, { name: "Silver", icon: "fa-award", color: "#c0c0c0" }, { name: "Gold", icon: "fa-trophy", color: "#ffd700" }, { name: "Platinum", icon: "fa-gem", color: "#e5e4e2" }, ]
    };

    // --- 狀態管理 ---
    let state = { currentUser: null, currentPage: 'dashboard', selectedAction: null, isUploading: false };

    // --- DOM 元素選擇器 (簡化版) ---
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    // --- 所有頁面和主要容器的變數 ---
    const loginPage = $('#login-page');
    const appContainer = $('#app');
    const pageTitle = $('#page-title');

    // --- 核心功能函數 ---

    function navigateTo(pageId) {
        $$('.page').forEach(p => p.classList.add('hidden'));
        const targetPage = $(`#${pageId}-page`);
        if(targetPage) {
            targetPage.classList.remove('hidden');
        }

        $$('.nav-link').forEach(l => l.classList.remove('active'));
        const targetLink = $(`.nav-link[data-page="${pageId}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
            pageTitle.textContent = targetLink.querySelector('span').textContent;
        }
        state.currentPage = pageId;
    }

    function updateDashboard() {
        const { user, uploads } = MOCK_DATA;
        $('#dashboard-total-uploads').textContent = user.totalUploads;
        $('#dashboard-points').textContent = user.points;
        $('#dashboard-earnings').textContent = `$${user.totalEarnings.toFixed(2)}`;
        $('#dashboard-level').textContent = user.level;
        const recentActivityBody = $('#recent-activity-body');
        recentActivityBody.innerHTML = '';
        uploads.slice(0, 5).forEach(up => {
            const action = MOCK_DATA.actions.find(a => a.nameEn === up.action);
            recentActivityBody.innerHTML += `
                <tr>
                    <td>${up.filename}</td>
                    <td>${action ? action.name : up.action}</td>
                    <td>${new Date(up.uploadDate).toLocaleDateString()}</td>
                    <td><span class="status-badge status-${up.status.replace(' ', '.')}">${up.status}</span></td>
                </tr>`;
        });
    }

    function populateQuickActions() {
        const container = $('#quick-actions-container');
        container.innerHTML = '';
        MOCK_DATA.actions.forEach(action => {
            container.innerHTML += `<button class="action-btn" style="background-color: ${action.color};" data-action="${action.id}"><i class="fas ${action.icon}"></i> ${action.name} (${action.nameEn})</button>`;
        });
    }

    function populateActionSelection() {
        const container = $('#action-selection-container');
        container.innerHTML = '';
        MOCK_DATA.actions.forEach(action => {
            container.innerHTML += `<div class="action-card" data-action="${action.id}"><i class="fas ${action.icon}" style="color: ${action.color}"></i><h4>${action.name}</h4><p>${action.nameEn}</p></div>`;
        });
    }

    function updateMyUploads() {
        const container = $('#my-uploads-body');
        container.innerHTML = '';
        MOCK_DATA.uploads.forEach(up => {
            const action = MOCK_DATA.actions.find(a => a.nameEn === up.action);
            container.innerHTML += `
                <tr>
                    <td>${up.filename}</td>
                    <td>${action ? action.name : up.action}</td>
                    <td>${new Date(up.uploadDate).toLocaleString()}</td>
                    <td><span class="status-badge status-${up.status.replace(' ', '.')}">${up.status}</span></td>
                    <td>${up.points}</td>
                    <td>$${up.earnings.toFixed(2)}</td>
                </tr>`;
        });
    }

    function updateRewardsCenter() {
        const { user } = MOCK_DATA;
        $('#rewards-points').textContent = user.points;
        $('#rewards-earnings').textContent = `$${user.totalEarnings.toFixed(2)}`;
        const levelContainer = $('#level-system-container');
        levelContainer.innerHTML = '';
        MOCK_DATA.levels.forEach(level => {
            levelContainer.innerHTML += `<div class="level-card ${level.name === user.level ? 'active' : ''}"><i class="fas ${level.icon} level-${level.name}"></i><h4>${level.name}</h4></div>`;
        });
        const achievementContainer = $('#achievements-container');
        achievementContainer.innerHTML = '';
        MOCK_DATA.achievements.forEach(ach => {
            achievementContainer.innerHTML += `<div class="achievement-card ${user.achievements.includes(ach.id) ? 'unlocked' : 'locked'}"><i class="fas ${ach.icon}"></i><h5>${ach.name}</h5></div>`;
        });
    }
    
    function handleFrontendUpload(file) {
        if (state.isUploading) return;
        if (!state.selectedAction) {
            alert('請先選擇一個動作類型！');
            return;
        }
        state.isUploading = true;
        const uploadProgressContainer = $('#upload-progress-container');
        const progressBarFill = $('#progress-bar-fill');
        const uploadStatusText = $('#upload-status-text');
        $('#upload-filename').textContent = file.name;
        uploadProgressContainer.classList.remove('hidden');

        let progress = 0;
        const simulateProgress = (duration, status, onComplete) => {
            uploadStatusText.textContent = status;
            let start = null;
            function step(timestamp) {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const percentage = Math.min(elapsed / duration, 1);
                progressBarFill.style.width = `${progress + percentage * (100 - progress) / 3}%`;
                if (elapsed < duration) { window.requestAnimationFrame(step); } 
                else {
                    progress += (100 - progress) / 3;
                    onComplete();
                }
            }
            window.requestAnimationFrame(step);
        };

        simulateProgress(1500, '上傳中...', () => {
            simulateProgress(1000, '處理中...', () => {
                simulateProgress(800, '同步到雲端...', () => {
                    uploadStatusText.textContent = '上傳完成！';
                    progressBarFill.style.backgroundColor = 'var(--success-color)';
                    const newUpload = { id: `upload${Date.now()}`, action: MOCK_DATA.actions.find(a => a.id === state.selectedAction).nameEn, filename: file.name, uploadDate: new Date().toISOString(), status: "Under Review", points: 0, earnings: 0.00 };
                    MOCK_DATA.uploads.unshift(newUpload);
                    MOCK_DATA.user.totalUploads++;
                    setTimeout(() => {
                        uploadProgressContainer.classList.add('hidden');
                        progressBarFill.style.width = '0%';
                        progressBarFill.style.backgroundColor = 'var(--success-color)';
                        state.isUploading = false;
                        $$('.action-card.selected').forEach(c => c.classList.remove('selected'));
                        state.selectedAction = null;
                        updateMyUploads();
                        navigateTo('my-uploads');
                    }, 1000);
                });
            });
        });
    }

    function initApp() {
        state.currentUser = MOCK_DATA.user;
        $('#welcome-username').textContent = state.currentUser.username;
        updateDashboard();
        populateQuickActions();
        populateActionSelection();
        updateMyUploads();
        updateRewardsCenter();
        initLabelingDemo(); // 初始化標籤演示功能
        
        loginPage.classList.remove('active');
        loginPage.classList.add('hidden');
        appContainer.classList.remove('hidden');
        navigateTo('dashboard');
    }

    // --- 事件監聽器 ---
    $('#login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if ($('#username').value === 'demo' && $('#password').value === 'demo') {
            initApp();
        } else {
            $('#login-error').textContent = '帳號或密碼錯誤';
        }
    });

    $('#logout-btn').addEventListener('click', () => {
        state.currentUser = null;
        appContainer.classList.add('hidden');
        loginPage.classList.remove('hidden');
        loginPage.classList.add('active');
        $('#login-error').textContent = '';
        $('#login-form').reset();
    });

    $$('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.dataset.page;
            if (pageId) navigateTo(pageId);
        });
    });

    $('#quick-actions-container').addEventListener('click', (e) => {
        const button = e.target.closest('.action-btn');
        if (button) {
            state.selectedAction = button.dataset.action;
            navigateTo('upload-center');
            $$('.action-card').forEach(c => c.classList.remove('selected'));
            const targetCard = $(`.action-card[data-action="${state.selectedAction}"]`);
            if(targetCard) targetCard.classList.add('selected');
        }
    });

    $('#action-selection-container').addEventListener('click', (e) => {
        const card = e.target.closest('.action-card');
        if (card) {
            $$('.action-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            state.selectedAction = card.dataset.action;
        }
    });

    const uploadArea = $('#upload-area');
    const fileInput = $('#file-input');
    $('#file-browser-link').addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            handleFrontendUpload(fileInput.files[0]);
        }
    });

    uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('dragover'); });
    uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFrontendUpload(e.dataTransfer.files[0]);
        }
    });

    // --- 標籤演示頁面專用邏輯 (簡化版) ---
    function initLabelingDemo() {
        const video = $('#demo-video');
        const timelineProgress = $('#timeline-progress');
        const timelineMarker = $('#timeline-marker');
        const currentTimeEl = $('#video-current-time');
        const durationEl = $('#video-duration');
        const timelineContainer = $('#timeline-container');
        
        // 格式化時間，例如 65 秒 -> "01:05"
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }

        // 當影片元數據載入完成後，設定總時長
        video.addEventListener('loadedmetadata', () => { 
            if (video.duration) {
                durationEl.textContent = formatTime(video.duration);
            }
        });

        // 當影片播放時間更新時，同步更新進度條和時間顯示
        video.addEventListener('timeupdate', () => {
            if (video.duration) {
                const progressPercent = (video.currentTime / video.duration) * 100;
                currentTimeEl.textContent = formatTime(video.currentTime);
                timelineProgress.style.width = `${progressPercent}%`;
                timelineMarker.style.left = `${progressPercent}%`;
            }
        });
        
        // 允許點擊時間軸來快轉/倒退
        timelineContainer.addEventListener('click', (e) => {
            if (video.duration) {
                const rect = timelineContainer.getBoundingClientRect();
                const clickPosition = e.clientX - rect.left;
                const seekTime = (clickPosition / rect.width) * video.duration;
                video.currentTime = seekTime;
            }
        });
    }

});