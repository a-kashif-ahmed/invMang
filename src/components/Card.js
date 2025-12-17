function Card({title,desc,img, link,emoji}){
    return(
        
<div className="ml-10 mr-auto">
    
    <a href={link} className="bg-slate-200 block max-w-sm p-6 border rounded-xl border-default rounded-base shadow-xs hover:shadow-xl hover:ring ring-gray-500 hover:bg-cyan-300">
        {/* <img src={img} /> */}
        <p className="text-9xl p-7">{emoji}</p>
    <h5 className="mb-3 text-2xl  font-semibold tracking-tight text-heading leading-8">{title} &rarr; </h5>
    <p className="text-body">{desc}</p>
</a>
</div>

    );
}

export default Card