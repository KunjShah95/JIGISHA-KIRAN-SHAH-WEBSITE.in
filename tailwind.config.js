// Tailwind CSS configuration
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
                'playfair': ['Playfair Display', 'serif'],
            },
            colors: {
                'primary': {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                'secondary': {
                    50: '#fefce8',
                    100: '#fef9c3',
                    200: '#fef08a',
                    300: '#fde047',
                    400: '#facc15',
                    500: '#eab308',
                    600: '#ca8a04',
                    700: '#a16207',
                    800: '#854d0e',
                    900: '#713f12',
                },
                'accent': {
                    500: '#10b981', // Green for WhatsApp button
                    600: '#059669'  // Darker green for hover
                }
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'fade-in-down': 'fadeInDown 0.6s ease-out',
                'slide-in-right': 'slideInRight 0.6s ease-out',
                'pulse-slow': 'pulse 3s infinite',
                'float': 'float 6s ease-in-out infinite',
                'bounce-gentle': 'bounce 3s infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(30px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                fadeInDown: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(-30px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                slideInRight: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(30px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(0)'
                    }
                },
                float: {
                    '0%, 100%': {
                        transform: 'translateY(0px)'
                    },
                    '50%': {
                        transform: 'translateY(-20px)'
                    }
                }
            },
            screens: {
                'xs': '475px',
                'print': { 'raw': 'print' }
            },
            spacing: {
                '18': '4.5rem',
                '72': '18rem',
                '84': '21rem',
                '96': '24rem',
                '128': '32rem'
            }
        }
    },
    plugins: [
        // This is handled by the CDN URL parameters
    ]
}
