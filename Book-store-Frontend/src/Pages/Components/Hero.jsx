import { useNavigate } from 'react-router-dom'
import heroimage from '../../assets/Books/pngwing 1.png'
export const Hero = () => {

    const navigate=useNavigate()
    return (
        <>

            <div className='bg-gray-100 my-10 border-2 border-gray-300 rounded-3xl shadow-xl py-7 px-5 md:py-20 flex max-sm:flex-col md:justify-center items-center md:space-x-20 max-sm:space-y-10 '>

                <section className=''>
                    <p className=' lg:text-4xl text-3xl md:text-6xl'>Books to freshen up</p><br />
                    <p className='lg:text-4xl text-3xl md:text-6xl'>your bookshelf</p>
                    <br />
                    <div className='max-sm:text-center'>
                        <button onClick={()=>navigate('/listed-books')} className="w-45 h-15 hover:bg-lime-700 md:mt-10 p-5 bg-lime-600 font-semibold text-lg text-white rounded-xl max-sm:mx-auto ">View The List</button>
                    </div>
                </section>

                <section className='lg:w-[300px] w-[200px]'>
                    <img src={heroimage} alt="" />
                </section>

            </div>
        </>

    )
}
