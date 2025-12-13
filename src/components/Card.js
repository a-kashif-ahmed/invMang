function Card({title,desc,img, link,emoji}){
    return(
        
<div className="ml-10 mr-auto">
    
    <a href={link} class="bg-gray-300 block max-w-sm p-6 border rounded-xl border-default rounded-base shadow-xs hover:shadow-xl hover:ring ring-gray-500 hover:bg-cyan-300">
        {/* <img src={img} /> */}
        <p className="text-9xl p-7">{emoji}</p>
    <h5 class="mb-3 text-2xl  font-semibold tracking-tight text-heading leading-8">{title} &rarr; </h5>
    <p class="text-body">{desc}</p>
</a>
</div>

    );
}

export default Card