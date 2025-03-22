import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ContactCta() {
  return (
    <section className="w-full py-12 md:py-24 bg-blue-950  text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Transform Your Business?</h2>
            <p className="max-w-[900px] md:text-lg">
              Contact us today to discuss how our solutions can help you achieve your business goals.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Contact Us</Link>
            </Button>
           
          </div>
        </div>
      </div>
    </section>
  )
}

