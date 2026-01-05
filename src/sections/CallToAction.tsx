import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CallToAction() {
    return (
        <section className="py-16">
            <div className="mx-auto max-w-5xl rounded-3xl border border-white/20 px-6 py-16 md:py-20 lg:py-32 bg-[#070707]/30">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Start Building</h2>
                    <p className="mt-4">Create Amazing Graphs with <span className="bg-gradient-to-r from-[#ec3e52] to-[#2b6ac4] inline-block text-transparent bg-clip-text">Datavanta.</span></p>

                    <div className="mt-12 flex justify-center">
                        <Button
                            asChild
                            size="lg">
                            <Link href="/sign-up">
                                <span>Get Started</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}