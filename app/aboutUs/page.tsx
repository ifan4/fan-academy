import Header from "../header";
import Image from "next/image";
import { Comfortaa } from 'next/font/google'
import { Github, Twitter } from "lucide-react";
import { Icons } from "@/components/icons";
const comfortaa = Comfortaa({ subsets: ['latin'] })

export default function AboutUs() {
    

    return(
        <>
            <Header/>
            <div className="text-slate-50 dark:text-slate-300">
                <div className="text-center lg:py-4 py-10 px-5">
                    <h1 className={`text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-slate-300 ${comfortaa.className}`}>
                        Get to Know with 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 block lg:inline"> Fan-Academia</span>
                    </h1>
                    <p className="text-md lg:text-2xl text-muted-foreground lg:w-[700px] mx-auto">
                        Discover the world of Fan-Academy and ignite your love for learning.
                    </p>
                </div>

                <div className="text-center bg-gradient-to-r from-cyan-500 to-teal-900 p-4 rounded-t-3xl dark:from-cyan-900 dark:to-slate-900">
                    <h2 className="text-3xl mb-4 font-bold">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600"> Fan-Academia </span> 
                        Core Team
                    </h2>
                    <div>
                        <div className="flex flex-col items-center space-y-2">
                            <Image
                            className="rounded-full" 
                            src={"/founder-ifan.png"} 
                            alt={""} 
                            width={150} 
                            height={150}/>
                            <div className="">
                                <div className="font-extrabold text-xl">Ifana Andriansyah</div>
                                <div>Founder</div>
                            </div>
                            <div className="flex justify-center space-x-4">
                                <Icons.gitHub 
                                className="w-5 h-5 hover:opacity-60" 
                                role="button"/>
                                <Twitter 
                                className="w-5 h-5 hover:opacity-60"
                                role="button"/>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="mb-5 bg-gradient-to-r from-cyan-600 to-teal-800 p-5 dark:from-cyan-950 dark:to-slate-900 transition ease-in-out backdrop-blur-3xl">
                    <div className="">
                        <h2 className="text-2xl font-extrabold mb-2">About the Founder</h2>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            As a founder of this e-learning platform, I carry a deep sense of responsibility rooted in my family's legacy and my own educational achievements. Being entrusted with the care of my grandparents, who were esteemed school principals, has instilled in me a profound appreciation for the transformative power of education. Moreover, earning a Bachelor's degree in Education has further solidified my commitment to delivering high-quality learning
                        </p>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">  
                            In addition to my educational background, I bring two years of practical experience as both a full-stack and frontend developer. This hands-on experience in the field of web development has equipped me with a comprehensive understanding of technology and its potential to enhance the learning process. I am passionate about merging my knowledge of education and technical skills to create an e-learning platform that effectively engages learners and empowers them to succeed.
                        </p>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            Driven by the belief that education should be accessible to all, I founded this platform to provide a diverse range of interactive courses. By leveraging my expertise in education and web development, I aim to create a dynamic learning environment that equips learners with the practical skills and knowledge needed to thrive in today's digital world. Together, let's embark on a transformative educational journey and unlock the full potential within each learner.
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-500 to-teal-900 p-4 rounded-t-3xl dark:from-sky-900 dark:to-slate-900 transition ease-in-out">
                    <h2 className="text-5xl font-bold inline-block border-b border-b-teal-100 pb-3 mb-4">
                        Our Mission <span className="block">& Vision</span>
                    </h2>
                    <p>
                    Our mission is to provide accessible and high-quality education to learners worldwide, empowering them with the knowledge and skills needed to succeed in the digital age. We strive to create an engaging and interactive e-learning platform that caters to diverse interests and learning styles. By leveraging innovative technologies and expert instruction, we aim to foster a lifelong love for learning and inspire personal growth in every individual.
                    </p>
                    <p className="text-2xl text-teal-100 py-5">
                        Empowering learners worldwide through accessible and transformative online education.
                    </p>
                </div>
            </div>
        </>
    )
}



// Welcome to Fan-Academy, the ultimate destination for knowledge seekers and enthusiasts. We are a vibrant community dedicated to providing engaging and immersive learning experiences. With a diverse range of courses, expert instructors, and interactive resources, Fan-Academy is your gateway to unlocking the depths of your passions. Whether you're a fan or an aspiring expert, join us on an educational journey where you can connect with like-minded individuals, explore captivating subjects, and expand your understanding. Experience the power of Fan-Academy and embark on a path of lifelong learning.