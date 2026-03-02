// 龙马精神 · 2026元宵节网站交互脚本

document.addEventListener('DOMContentLoaded', function() {
    // 1. 元宵节倒计时
    function updateCountdown() {
        // 2026年元宵节：3月5日
        const yuanxiaoDate = new Date('2026-03-05T00:00:00');
        const now = new Date();
        
        // 计算时间差（毫秒）
        const diff = yuanxiaoDate - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // 更新显示
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // 元宵节已到
            document.getElementById('countdown').innerHTML = `
                <div class="time-unit">
                    <span class="number" style="color: #ffd700;">🎉</span>
                    <span class="label">元宵快乐</span>
                </div>
            `;
            document.querySelector('.countdown-note').textContent = '2026年元宵节已到来！祝您节日快乐！';
        }
    }
    
    // 初始更新并设置定时器
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // 2. 灯谜答案显示
    const showAnswerBtn = document.querySelector('.show-answer');
    const answerText = document.querySelector('.answer');
    
    if (showAnswerBtn && answerText) {
        showAnswerBtn.addEventListener('click', function() {
            if (answerText.style.display === 'block') {
                answerText.style.display = 'none';
                showAnswerBtn.textContent = '显示答案';
            } else {
                answerText.style.display = 'block';
                showAnswerBtn.textContent = '隐藏答案';
                
                // 添加庆祝效果
                showAnswerBtn.style.background = 'linear-gradient(135deg, #2e7d32, #4caf50)';
                setTimeout(() => {
                    showAnswerBtn.style.background = 'linear-gradient(135deg, var(--primary-red), var(--secondary-red))';
                }, 1000);
            }
        });
    }
    
    // 3. 音乐控制
    const musicToggle = document.getElementById('musicToggle');
    const festivalMusic = document.getElementById('festivalMusic');
    let isPlaying = false;
    
    if (musicToggle && festivalMusic) {
        musicToggle.addEventListener('click', function() {
            if (isPlaying) {
                festivalMusic.pause();
                musicToggle.innerHTML = '<i class="fas fa-music"></i><span>播放音乐</span>';
                musicToggle.style.background = 'linear-gradient(135deg, #666, #888)';
            } else {
                festivalMusic.play().catch(e => {
                    console.log('自动播放被阻止，请点击播放按钮');
                    musicToggle.innerHTML = '<i class="fas fa-play"></i><span>点击播放</span>';
                });
                musicToggle.innerHTML = '<i class="fas fa-pause"></i><span>暂停音乐</span>';
                musicToggle.style.background = 'linear-gradient(135deg, var(--primary-red), var(--secondary-red))';
            }
            isPlaying = !isPlaying;
        });
        
        // 尝试自动播放（用户交互后）
        document.addEventListener('click', function initMusic() {
            if (!isPlaying) {
                festivalMusic.play().then(() => {
                    isPlaying = true;
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i><span>暂停音乐</span>';
                }).catch(e => {
                    // 自动播放被阻止，等待用户交互
                });
                document.removeEventListener('click', initMusic);
            }
        });
    }
    
    // 4. 随机祝福语效果
    const blessings = document.querySelectorAll('.floating-blessings span');
    blessings.forEach((blessing, index) => {
        // 随机起始位置
        const randomStart = Math.random() * 100;
        blessing.style.left = `${randomStart}%`;
        
        // 随机动画时长
        const randomDuration = 15 + Math.random() * 10;
        blessing.style.animationDuration = `${randomDuration}s`;
        
        // 随机大小
        const randomScale = 0.8 + Math.random() * 0.4;
        blessing.style.transform = `scale(${randomScale})`;
    });
    
    // 5. 卡片悬停效果增强
    const cards = document.querySelectorAll('.info-card, .meaning-item, .lantern-riddle, .countdown');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(211, 47, 47, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // 6. 节日特效 - 点击页面出现烟花
    document.addEventListener('click', function(e) {
        createFirework(e.clientX, e.clientY);
    });
    
    function createFirework(x, y) {
        const firework = document.createElement('div');
        firework.style.position = 'fixed';
        firework.style.left = `${x}px`;
        firework.style.top = `${y}px`;
        firework.style.width = '5px';
        firework.style.height = '5px';
        firework.style.borderRadius = '50%';
        firework.style.background = getRandomColor();
        firework.style.pointerEvents = 'none';
        firework.style.zIndex = '9999';
        firework.style.boxShadow = `0 0 20px 10px ${getRandomColor()}`;
        
        document.body.appendChild(firework);
        
        // 爆炸效果
        const explosion = document.createElement('div');
        explosion.style.position = 'fixed';
        explosion.style.left = `${x}px`;
        explosion.style.top = `${y}px`;
        explosion.style.width = '0';
        explosion.style.height = '0';
        explosion.style.borderRadius = '50%';
        explosion.style.background = 'radial-gradient(circle, transparent 30%, rgba(255,255,255,0.8) 70%)';
        explosion.style.pointerEvents = 'none';
        explosion.style.zIndex = '9998';
        
        document.body.appendChild(explosion);
        
        // 动画
        const fireworkAnim = firework.animate([
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(3)', opacity: 0 }
        ], {
            duration: 500,
            easing: 'ease-out'
        });
        
        const explosionAnim = explosion.animate([
            { width: '0', height: '0', opacity: 1 },
            { width: '100px', height: '100px', opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        });
        
        // 清理
        fireworkAnim.onfinish = () => {
            firework.remove();
            explosion.remove();
        };
    }
    
    function getRandomColor() {
        const colors = [
            '#ff0000', '#ff9900', '#ffff00', '#00ff00', 
            '#00ffff', '#0000ff', '#9900ff', '#ff00ff'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // 7. 页面加载完成特效
    window.addEventListener('load', function() {
        // 添加加载完成类
        document.body.classList.add('loaded');
        
        // 显示欢迎消息
        setTimeout(() => {
            const welcomeMsg = document.createElement('div');
            welcomeMsg.style.position = 'fixed';
            welcomeMsg.style.top = '50%';
            welcomeMsg.style.left = '50%';
            welcomeMsg.style.transform = 'translate(-50%, -50%)';
            welcomeMsg.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.9), rgba(211, 47, 47, 0.9))';
            welcomeMsg.style.color = 'white';
            welcomeMsg.style.padding = '20px 40px';
            welcomeMsg.style.borderRadius = '15px';
            welcomeMsg.style.fontSize = '1.5rem';
            welcomeMsg.style.fontWeight = 'bold';
            welcomeMsg.style.zIndex = '10000';
            welcomeMsg.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            welcomeMsg.textContent = '🎉 欢迎来到龙马精神元宵庆典！';
            
            document.body.appendChild(welcomeMsg);
            
            // 3秒后消失
            setTimeout(() => {
                welcomeMsg.animate([
                    { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
                    { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' }
                ], {
                    duration: 500,
                    easing: 'ease-out'
                }).onfinish = () => welcomeMsg.remove();
            }, 3000);
        }, 1000);
    });
    
    // 8. 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有区块
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // 9. 控制台祝福
    console.log('%c🎉 龙马精神 · 2026元宵快乐！ 🎉', 'color: #d32f2f; font-size: 18px; font-weight: bold;');
    console.log('%c愿您和家人：\n🐉 龙腾虎跃展宏图\n🐎 马到成功事事顺\n🏮 元宵团圆福满门\n✨ 幸福安康乐融融', 
        'color: #ff9800; font-size: 14px; line-height: 1.5;');
    
    // 10. 键盘快捷键
    document.addEventListener('keydown', function(e) {
        // M键控制音乐
        if (e.key === 'm' || e.key === 'M') {
            if (musicToggle) musicToggle.click();
        }
        // F键触发烟花
        if (e.key === 'f' || e.key === 'F') {
            createFirework(
                window.innerWidth / 2,
                window.innerHeight / 2
            );
        }
        // 1键滚动到顶部
        if (e.key === '1') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    // 显示键盘快捷键提示
    setTimeout(() => {
        console.log('%c🎮 键盘快捷键：\nM - 切换音乐\nF - 触发烟花\n1 - 回到顶部', 
            'color: #2e7d32; font-size: 12px; background: #f0f0f0; padding: 5px;');
    }, 5000);
});