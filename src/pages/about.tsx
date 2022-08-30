import { NextPage } from 'next';
import Image from 'next/image';
import Footer from '../components/Footer';

const About: NextPage = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col md:flex-row gap-16 md:gap-20 p-8 md:p-0">
            <div className="flex flex-col gap-4">
                <h1 className="md:leading-[80px] font-bold text-[42px] md:text-[64px] max-w-[580px] text-start text-white">
                    Qual é a nossa Missão?
                </h1>
                <p className="max-w-[480px] text-start text-white">
                    Encurtamos seus links para que você possa compartilhar seus conteúdos de uma forma mais fácil e
                    rápida. Além de oferecermos opções personalizadas para que você possa controlar o seu conteúdo.
                </p>
            </div>
            <Image width={400} height={300} src="/assets/engineering_team.svg" alt="Time do Encurte Livre" />
            <Footer />
        </div>
    );
};

export default About;
