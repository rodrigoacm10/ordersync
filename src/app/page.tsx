import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { RiFileList2Line } from "react-icons/ri";

export default function Home() {
  // return (
  //   <main>
  //     <div className="">
  //       <div className="flex px-10 py-5 items-center justify-between">
  //         <p className="font-bold text-[36px]">OrderSync</p>
  //         <div className="flex items-center gap-2">
  //           <Link href="/register">
  //             {" "}
  //             <Button className="w-[100px]" variant="outline">
  //               criar conta
  //             </Button>
  //           </Link>
  //           <Link href="/login">
  //             <Button className="w-[100px]">entrar</Button>
  //           </Link>
  //         </div>
  //       </div>
  //       <h1>landing page</h1>
  //     </div>
  //   </main>
  // );
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <RiFileList2Line className="h-8 w-8" />
          {/* <PackageIcon className="h-6 w-6" /> */}
          <span className="sr-only">OrderSync</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <div className="flex pt-3 items-center gap-2">
            <Link href="/register">
              {" "}
              <Button className="w-[100px]" variant="outline">
                criar conta
              </Button>
            </Link>
            <Link href="/login">
              <Button className="w-[100px]">entrar</Button>
            </Link>
          </div>
          {/* <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link> */}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Simplifique o gerenciamento de seus pedidos com OrderSync
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    OrderSync é um poderoso aplicativo de gerenciamento de
                    pedidos que ajuda você a rastrear pedidos, gerenciar estoque
                    e gerar relatórios perspicazes.
                  </p>
                </div>
                <div className="flex   gap-2 min-[400px]:flex-row">
                  <Link
                    href="/register"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Testar OrderSync
                  </Link>
                  <a
                    href="#content"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    // prefetch={false}
                  >
                    Ler mais
                  </a>
                </div>
              </div>
              {/* <img
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              /> */}
            </div>
          </div>
        </section>
        <section
          id="content"
          className=" w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Principais recursos
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Simplifique o gerenciamento de seus pedidos
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  OrderSync fornece um conjunto abrangente de ferramentas para
                  ajudá-lo gerencie seus pedidos, estoque e relatórios com
                  facilidade.
                </p>
              </div>
            </div>
            <div className="  grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Acompanhamento de pedidos
                      </h3>
                      <p className="text-muted-foreground">
                        Acompanhe o status dos seus pedidos em tempo real e
                        receba notificações sobre atualizações de pedidos.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Gerenciamento de Estoque
                      </h3>
                      <p className="text-muted-foreground">
                        Gerencie seus níveis de estoque, receba alertas de
                        estoque baixo, e gerar relatórios sobre movimentos de
                        estoque.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Ordenação Inteligente de Pedidos
                      </h3>
                      <p className="text-muted-foreground">
                        Classifique e organize seus pedidos automaticamente com
                        base em critérios personalizados, como urgência, tipo de
                        produto ou cliente. Mantenha suas operações sempre
                        eficientes e bem organizadas.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              {/* <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              /> */}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Benefícios
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Simplifique o gerenciamento de seus pedidos com OrderSync
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                OrderSync ajuda você a economizar tempo, reduzir erros e tomar
                decisões informadas com seus poderosos recursos de gerenciamento
                de pedidos.
              </p>
            </div>
            <div className="flex   gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Experimentar OrderSync
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Comece com o OrderSync
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Inscreva-se para um teste gratuito e experimente o poder do
                OrderSync para o seu negócio.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex justify-center gap-2">
                {/* <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-lg flex-1"
                /> */}
                <Link href="/register">
                  <Button type="submit">Começar</Button>
                </Link>
              </form>
              <p className="text-xs text-muted-foreground">
                Utilize permanentemente{" "}
                <span className="underline underline-offset-2">sem custos</span>
                {/* <Link
                  href="#"
                  className="underline underline-offset-2"
                  prefetch={false}
                >
                  Terms &amp; Conditions
                </Link> */}
              </p>
            </div>
          </div>
        </section>
        {/* <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by Businesses of All Sizes
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                OrderSync is used by businesses across various industries to
                streamline their order management processes.
              </p>
            </div>
            <div className="divide-y rounded-lg border">
              <div className="grid w-full grid-cols-3 items-stretch justify-center divide-x md:grid-cols-3">
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <img
                    src="/placeholder.svg"
                    width="140"
                    height="70"
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                  />
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <img
                    src="/placeholder.svg"
                    width="140"
                    height="70"
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                  />
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-8">
                  <img
                    src="/placeholder.svg"
                    width="140"
                    height="70"
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                  />
                </div>
              </div>
              <div className="grid w-full grid-cols-3 items-stretch justify-center divide-x md:grid-cols-3">
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <img
                    src="/placeholder.svg"
                    width="140"
                    height="70"
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                  />
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <img
                    src="/placeholder.svg"
                    width="140"
                    height="70"
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                  />
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <img
                    src="/placeholder.svg"
                    width="140"
                    height="70"
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Sign Up
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
        </section> */}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 OrderSync. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
