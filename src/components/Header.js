import Image from 'next/image'

const Header = () => {
    return (<header className="py-4 font-sans text-2xl font-bold text-center text-white capitalize bg-blue-400">                
        <Image alt='evandromyller-Papyrus' src='/evandromyller-Papyrus.png' width={30} height={30} quality={100} className='inline mr-4 align-text-bottom' />
        papyrus
    </header>)
}

export default Header