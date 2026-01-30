
import { Header } from './Header';

interface LayoutProps {
    children: React.ReactNode;
    showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
            <Header />
            <main className="flex-1 pt-24 pb-12 px-4 md:px-6">
                <div className="max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>

            {showFooter && (
                <footer className="py-8 border-t bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <p className="font-serif font-bold text-lg">HortiFruti Express</p>
                            <p className="text-sm text-muted-foreground mt-1">Conectando produtores e clientes.</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} HortiFruti Express. Todos os direitos reservados.
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
}
