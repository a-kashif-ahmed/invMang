function StatusSphere({color,text}){
 return(
    <p className="font-semibold"><span className="flex items-center text-sm font-medium text-heading me-3"><span className={`flex w-27 h-12 p-3 ${color} rounded-full me-1.5 shrink-0 text-white`}>{text}</span ></span></p>
 )
}
export default StatusSphere