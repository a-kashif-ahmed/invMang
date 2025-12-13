function StatusSphere({color,text}){
 return(
    <p className="font-semibold"><span class="flex items-center text-sm font-medium text-heading me-3"><span class={`flex w-2.5 h-2.5 ${color} rounded-full me-1.5 shrink-0`}></span>{text}</span></p>
 )
}
export default StatusSphere