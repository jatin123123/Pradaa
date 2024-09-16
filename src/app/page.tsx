'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';
import Image from 'next/image';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
   
    gsap.registerPlugin(ScrollTrigger);

    // Animate elements with GSAP
    document.querySelectorAll('.elem').forEach((elem) => {
      const image = elem.querySelector('img');
      const tl = gsap.timeline();
      const xtTransform = gsap.utils.random(-100, 100);

      tl.set(image, {
        transformOrigin: `${xtTransform < 0 ? 0 : '100%'}`,
      }, 'start')
        .to(image, {
          scale: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: image,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }, 'start')
        .to(elem, {
          xPercent: xtTransform,
          ease: 'Power4.easeInOut',
          scrollTrigger: {
            trigger: image,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
    });

    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    if (context) {
      context.filter = 'brightness(1.5) contrast(1.2)';
    }

    const frames = {
      currentIndex: 0,
      maxIndex: 332,
    };
    const images: HTMLImageElement[] = [];
    let imagesLoaded = 0;

    function preloadImages() {
      for (let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl = `/frame/frame_${i.toString().padStart(4, '0')}.jpeg`;

        // Native Image constructor for preloading
        const img = new window.Image();
        img.src = imageUrl;
        img.onload = () => {
          imagesLoaded++;
          if (imagesLoaded === frames.maxIndex) {
            loadImage(frames.currentIndex);
            startAnimation();
          }
        };
        images.push(img);
      }
    }

    function loadImage(index: number) {
      if (index >= 0 && index <= frames.maxIndex) {
        const img = images[index];
        if (img && img.complete && context) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          const scaleX = canvas.width / img.width;
          const scaleY = canvas.height / img.height;
          const scale = Math.max(scaleX, scaleY);

          const newWidth = img.width * scale;
          const newHeight = img.height * scale;

          const offsetX = (canvas.width - newWidth) / 2;
          const offsetY = (canvas.height - newHeight) / 2;

          context.clearRect(0, 0, canvas.width, canvas.height);
          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = 'high';
          context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

          frames.currentIndex = index;
        }
      }
    }

    function startAnimation() {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.parent',
          start: 'top top',
          scrub: 2,
        },
      });

      function updateFrame(index: number) {
        return {
          currentIndex: index,
          onUpdate: function () {
            loadImage(Math.floor(frames.currentIndex));
          },
        };
      }

      tl.to(frames, updateFrame(50), 'first')
        .to('.animate1', { opacity: 0, ease: 'linear' }, 'first')
        .to(frames, updateFrame(80), 'second')
        .to('.animate2', { opacity: 1, ease: 'linear' }, 'second')
        .to(frames, updateFrame(110), 'third')
        .to('.animate2', { opacity: 1, ease: 'linear' }, 'third')
        .to(frames, updateFrame(140), 'fourth')
        .to('.animate2', { opacity: 0, ease: 'linear' }, 'fourth')
        .to(frames, updateFrame(170), 'fifth')
        .to('.animate3', { opacity: 1, ease: 'linear' }, 'fifth')
        .to(frames, updateFrame(200), 'sixth')
        .to('.animate3', { opacity: 1, ease: 'linear' }, 'sixth');
    }

    window.addEventListener('resize', function () {
      loadImage(Math.floor(frames.currentIndex));
    });

    preloadImages();
  }, []);
  return (
    <div>
      <div className="bg-zinc-900 w-full">
        <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
           
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0">
                  <Image width={80} height={40} className="h-8 w-auto" src="https://www.pngall.com/wp-content/uploads/13/Prada-Logo-PNG-File.png" alt="Prada Logo" quality={100} />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Services</a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
            </div>
          </div>
        </nav>
        <div className="grid grid-cols-8 grid-rows-20 gap-2">
          <div className="elem col-span-1 row-span-1" style={{ '--r': 1, '--c': 3 } as React.CSSProperties}><Image width={150} height={150} src="https://plus.unsplash.com/premium_photo-1669704098750-7cd22c35422b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9kZWx8ZW58MHx8MHx8fDA%3D" alt="Image 1" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 1, '--c': 7 } as React.CSSProperties}><Image width={150} height={150} src="https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 2" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 2, '--c': 2 } as React.CSSProperties}><Image width={150} height={150} src="https://images.unsplash.com/photo-1469460340997-2f854421e72f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 3" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 2, '--c': 6 } as React.CSSProperties}><Image width={150} height={150} src="https://plus.unsplash.com/premium_photo-1673757121102-0ca51260861f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 4" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 3, '--c': 4 } as React.CSSProperties}><Image width={150} height={150} src="https://plus.unsplash.com/premium_photo-1661775820832-f971657b13f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 5" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 3, '--c': 8 } as React.CSSProperties}><Image width={150} height={150} src="https://images.unsplash.com/photo-1498982261566-1c28c9cf4c02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 6" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 4, '--c': 1 } as React.CSSProperties}><Image width={150} height={150} src="https://images.unsplash.com/photo-1462804993656-fac4ff489837?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 7" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 4, '--c': 4 } as React.CSSProperties}><Image width={150} height={150} src="https://images.unsplash.com/photo-1440589473619-3cde28941638?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 8" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 5, '--c': 2 } as React.CSSProperties}><Image width={150} height={150} src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 9" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 5, '--c': 6 } as React.CSSProperties}><Image width={150} height={150} src="https://images.unsplash.com/photo-1514315384763-ba401779410f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 10" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 6, '--c': 3 } as React.CSSProperties}><Image width={150} height={150} src="https://plus.unsplash.com/premium_photo-1675107359685-f268487a3a46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 11" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 6, '--c': 7 } as React.CSSProperties}><Image width={150} height={150} src="https://plus.unsplash.com/premium_photo-1669703777695-f8052a432411?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 12" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 7, '--c': 5 } as React.CSSProperties}><Image width={150} height={150} src="https://images.unsplash.com/photo-1468112014733-deb9e1f8ddd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 13" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 7, '--c': 8 } as React.CSSProperties}><Image width={150} height={150} src="https://plus.unsplash.com/premium_photo-1664464229692-44046bfd6b7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 14" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 8, '--c': 1 } as React.CSSProperties}><Image width={150} height={150} src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 15" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 8, '--c': 4 } as React.CSSProperties}><Image width={150} height={150} src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 16" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 9, '--c': 2 } as React.CSSProperties}><Image width={150} height={150} src="https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 17" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 9, '--c': 6 } as React.CSSProperties}><Image width={150} height={150} src="https://plus.unsplash.com/premium_photo-1672907031715-fa4214fc3803?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 18" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 10, '--c': 3 } as React.CSSProperties}><Image width={150} height={150} src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 19" /></div>
          <div className="elem col-span-1 row-span-1" style={{ '--r': 10, '--c': 7 } as React.CSSProperties}><Image width={150} height={150} src="https://images.unsplash.com/photo-1544717304-a2db4a7b16ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fG1vZGVsfGVufDB8fDB8fHww" alt="Image 20" /></div>
        </div>
        <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center text-white" style={{ fontFamily: "'Helvetica_Now_Display', sans-serif" }}>
          <h1 className="text-8xl mb-4 uppercase">Thomas Vance
            <sup>®</sup>
          </h1>
          <h1 className="text-4xl">並外れたファッション</h1>
        </div>
      
      <div className='w-full h-screen bg-zinc-900 py-96 mx-auto relative px-52 flex-col z-[999] text-center flex items-center justify-center '>
        <h1 className='text-white text-4xl p-10 absolute top-10'>Premium Products</h1>
        <p className='text-sm -mt-40'>Prada, an epitome of luxury and sophistication, has been a trailblazer in the fashion industry since 1913. Renowned for its innovative designs and exceptional craftsmanship, Prada seamlessly blends tradition with modernity. Each collection is a testament to the brands commitment to quality and style, offering timeless pieces that exude elegance. From iconic handbags to avant-garde clothing, Prada continues to set trends and redefine fashion. Embrace the allure of Prada and experience the pinnacle of Italian luxury, where every detail is meticulously crafted to perfection.</p>
      </div>
        
      <div>
      <div className="parent bg-zinc-900 relative w-full h-[2000vh] ">
            <div className="w-full sticky top-0 left-0 h-screen overflow-x-hidden">
                <canvas className="w-full h-screen" id="canvas"></canvas>
                <div className="animate1 absolute z-[2] text-white bottom-10 w-1/2 left-10">
                    <h1 className="leding-20 font-[100] text-3xl">
                        &copy; 2024 DOZE STD
                    </h1>
                    <h1 className="text-3xl">SHAPING BRANDS - CRAFTING MOTION</h1>
                </div>
            <div className="absolute animate2 flex z-[2] text-white bottom-10 w-1/2  right-10  text-right opacity-0">
              <h1 className="leading-20 font-[100] uppercase text-6xl"> 
                Transforming Visions
              </h1>
              <h1 className="text-xl w-1/2">
                Building identity and inspiring action. Scupting digital experience resonate. 
              </h1>
            </div>
            <div className="absolute  animate3 z-[2] text-white opacity-0 top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2   text-center">
              <h1 className="leding-20 font-[100]  uppercase text-6xl">
                Elevating Aesthetics
              </h1>
              <h1 className="text-xl">Crafting solutions and exploring horizons. Evoving  narratives nad elevating aestathics  in every project. </h1>
            </div>
            <div className="w-1/3   panel translate-x-full h-screen  text-black bg-white absolute right-0 top-0  z-50 p-10"> 
              <h3 className="panelelm  text-xl font-[100] "> &copy; 2024 Doze.Std</h3>
              <p className="panelelm text-xl mt-10 ">
                Sclumpting Digital 
                Transforming vision into digital relises. weaving stories that captivate and inovate .
                Exploring new posibelatis with the focus on narative elutation. Crafting solutions that engage and 
                elevate. 
              </p>
              <button className="panelelm border-[1px] px-3 hover:bg-black hover:text-white rounded-xl py-2 border-[#555] font-[100] mt-6  ">Get Reviews-</button>
              <div className="panelelm absolute bottom-10">
                <h3 className="text-xl">Inovating Design</h3>
                <p className="text-sm mt-3"> connecting ideas to foster activets . Designe Impectfull  experiences that 
                  resoneate.
                  Feel free to mix and match these section to sute your websites designes neads!  
                </p>
                <button className="bg-black px-7 text-sm  mt-4 py-4 font-[100] hover:bg-white hover:text-black border rounded-xl border-black  captalize text-white">
                  experience
                </button>
              </div>
            </div>
            <div className="absolute z-[2]  panelesm text-white  top-1/2  left-1/2  -translate-x-1/2 -translate-y-1/2 text-center text-6xl tracking-tighter opacity-0 ">
              &copy;panelism 
              <span className="line w-10 h-1 bg-white inline-block  " >
                
              </span>
              2048
            </div>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
}
