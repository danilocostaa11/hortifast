
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Início', path: '/' },
        { name: 'Como Funciona', path: '/instructions' },
        { name: 'Catálogo Demo', path: '/catalog/vendor-demo' },
    ];

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-6',
                isScrolled ? 'py-3 backdrop-blur-md bg-background/80 shadow-sm' : 'py-5 bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-primary/10 text-primary p-2 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <Leaf className="h-6 w-6" />
                    </div>
                    <span className="font-serif font-bold text-xl tracking-tight">HortiFruti Express</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={cn(
                                'text-sm font-medium transition-colors hover:text-primary',
                                location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button onClick={() => window.location.href = '/dashboard'} variant="default" size="sm" className="rounded-full px-6">
                        Acessar Painel
                    </Button>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden bg-background border-b"
                    >
                        <nav className="flex flex-col p-4 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        'text-base font-medium py-2',
                                        location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button onClick={() => window.location.href = '/dashboard'} className="w-full mt-2">
                                Acessar Painel
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
