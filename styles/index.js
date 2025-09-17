// Page Navigation System
        let currentPage = 'home';
        
        function showPage(pageName) {
            // Hide current page
            const currentPageElement = document.getElementById(currentPage + '-page');
            if (currentPageElement) {
                currentPageElement.classList.remove('active');
            }
            
            // Show new page
            setTimeout(() => {
                const newPageElement = document.getElementById(pageName + '-page');
                if (newPageElement) {
                    newPageElement.classList.add('active');
                    currentPage = pageName;
                    
                    // Update navigation
                    updateNavigation(pageName);
                    
                    // Initialize page specific functions
                    initializePage(pageName);
                }
            }, 300);
            
            // Close mobile menu
            closeMobileMenu();
        }
        
        function updateNavigation(activePage) {
            // Desktop navigation
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Mobile navigation
            document.querySelectorAll('.mobile-nav-item').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current page links
            const activeLinks = document.querySelectorAll(`[onclick="showPage('${activePage}')"]`);
            activeLinks.forEach(link => {
                link.classList.add('active');
            });
        }
        
        function initializePage(pageName) {
            switch(pageName) {
                case 'dashboard':
                    initCharts();
                    break;
                case 'mining':
                    calculateProfit();
                    break;
                case 'home':
                    animateCounters();
                    break;
            }
        }
        
        // Mobile Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        function closeMobileMenu() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
        
        // Loan System
        let currentService = '';
        let currentAmount = 0;
        let selectedPaymentMethod = '';
        
        function showLoanOptions(service, amount) {
            currentService = service;
            currentAmount = amount;
            
            // Update service info
            const serviceNames = {
                'instagram': 'تبلیغات اینستاگرام',
                'website': 'طراحی سایت',
                'mobile': 'اپلیکیشن موبایل',
                'youtube': 'بازاریابی یوتیوب',
                'google': 'تبلیغات گوگل',
                'complete': 'پکیج کامل',
                'mining-basic': 'استخراج ابری - پلن مبتدی',
                'mining-standard': 'استخراج ابری - پلن استاندارد',
                'mining-vip': 'استخراج ابری - پلن VIP'
            };
            
            document.getElementById('serviceInfo').innerHTML = `
                <div class="netflix-card p-6 border border-red-500">
                    <h4 class="text-2xl font-bold text-center mb-2">${serviceNames[service]}</h4>
                    <p class="text-center text-gray-300">قیمت کل: ${amount.toLocaleString()} تومان</p>
                </div>
            `;
            
            // Calculate installments
            const loan24 = Math.ceil(amount / 24);
            const loan36 = Math.ceil(amount / 36);
            
            document.getElementById('cashAmount').textContent = amount.toLocaleString() + ' تومان';
            document.getElementById('loan24Amount').textContent = loan24.toLocaleString() + ' تومان';
            document.getElementById('loan36Amount').textContent = loan36.toLocaleString() + ' تومان';
            
            // Show modal
            document.getElementById('loanModal').classList.remove('hidden');
            document.getElementById('loanModal').classList.add('flex');
        }
        
        function showMiningLoan() {
            const investment = parseFloat(document.getElementById('investment').value) || 10000000;
            showLoanOptions('mining-custom', investment);
        }
        
        function closeLoanModal() {
            document.getElementById('loanModal').classList.add('hidden');
            document.getElementById('loanModal').classList.remove('flex');
            selectedPaymentMethod = '';
            
            // Reset selections
            document.querySelectorAll('.loan-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            document.getElementById('confirmPayment').disabled = true;
        }
        
        function selectPaymentMethod(method) {
            selectedPaymentMethod = method;
            
            // Update UI
            document.querySelectorAll('.loan-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            event.currentTarget.classList.add('selected');
            document.getElementById('confirmPayment').disabled = false;
        }
        
        function confirmPayment() {
            if (!selectedPaymentMethod) return;
            
            let message = '';
            switch(selectedPaymentMethod) {
                case 'cash':
                    message = `درخواست پرداخت نقدی ${currentAmount.toLocaleString()} تومان برای ${currentService} ثبت شد.`;
                    break;
                case 'loan24':
                    const loan24 = Math.ceil(currentAmount / 24);
                    message = `درخواست وام 24 ماهه با قسط ${loan24.toLocaleString()} تومانی برای ${currentService} ثبت شد.`;
                    break;
                case 'loan36':
                    const loan36 = Math.ceil(currentAmount / 36);
                    message = `درخواست وام 36 ماهه با قسط ${loan36.toLocaleString()} تومانی برای ${currentService} ثبت شد.`;
                    break;
            }
            
            showNotification(message + ' کارشناس ما با شما تماس خواهد گرفت.');
            closeLoanModal();
        }
        
        // Notification System
        function showNotification(message) {
            const notification = document.getElementById('notification');
            const notificationText = document.getElementById('notificationText');
            notificationText.textContent = message;
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 5000);
        }
        
        // Mining Calculator
        function calculateProfit() {
            const investment = parseFloat(document.getElementById('investment').value) || 0;
            const period = parseInt(document.getElementById('period').value) || 0;
            
            const monthlyRate = 0.15; // 15% monthly
            const monthlyProfit = investment * monthlyRate;
            const totalProfit = monthlyProfit * period;
            const totalReturn = (totalProfit / investment) * 100;
            
            document.getElementById('monthly-profit').textContent = monthlyProfit.toLocaleString() + ' تومان';
            document.getElementById('total-profit').textContent = totalProfit.toLocaleString() + ' تومان';
            document.getElementById('total-return').textContent = totalReturn.toFixed(0) + '%';
        }
        
        // Counter Animation
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
            }, 20);
        }
        
        function animateCounters() {
            const counters = [
                { id: 'clients', target: 5000 },
                { id: 'projects', target: 12000 },
                { id: 'income', target: 850 },
                { id: 'years', target: 5 }
            ];
            
            counters.forEach(counter => {
                const element = document.getElementById(counter.id);
                if (element) {
                    animateCounter(element, counter.target);
                }
            });
        }
        
        // Initialize Charts
        function initCharts() {
            // Revenue Chart
            const revenueCtx = document.getElementById('revenueChart');
            if (revenueCtx) {
                new Chart(revenueCtx.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
                        datasets: [{
                            label: 'درآمد (میلیون تومان)',
                            data: [45, 72, 86, 91, 105, 134],
                            borderColor: '#e50914',
                            backgroundColor: 'rgba(229, 9, 20, 0.1)',
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: { color: '#ffffff' }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: { color: '#ffffff' },
                                grid: { color: 'rgba(255, 255, 255, 0.1)' }
                            },
                            x: {
                                ticks: { color: '#ffffff' },
                                grid: { color: 'rgba(255, 255, 255, 0.1)' }
                            }
                        }
                    }
                });
            }

            // Service Chart
            const serviceCtx = document.getElementById('serviceChart');
            if (serviceCtx) {
                new Chart(serviceCtx.getContext('2d'), {
                    type: 'doughnut',
                    data: {
                        labels: ['استخراج ابری', 'تبلیغات اینستاگرام', 'طراحی سایت', 'اپلیکیشن موبایل', 'سایر'],
                        datasets: [{
                            data: [40, 25, 15, 12, 8],
                            backgroundColor: ['#e50914', '#ffd700', '#00d4aa', '#667eea', '#764ba2']
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: { color: '#ffffff' }
                            }
                        }
                    }
                });
            }
        }
        
        // Form submission
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('فرم با موفقیت ارسال شد! به زودی با شما تماس می‌گیریم.');
            setTimeout(() => {
                e.target.reset();
            }, 2000);
        });
        
        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize home page
            initializePage('home');
            
            // Initial calculator calculation
            calculateProfit();
            
            // Close modal when clicking outside
            document.getElementById('loanModal').addEventListener('click', (e) => {
                if (e.target.id === 'loanModal') {
                    closeLoanModal();
                }
            });
            
            // Welcome notification
            setTimeout(() => {
                showNotification('به مکس نت خوش آمدید! همین حالا خدمات را با امکان پرداخت اقساطی بررسی کنید.');
            }, 2000);
        });