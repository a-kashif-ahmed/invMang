import Card from '../components/Card';
import TopNavBar from '../components/TopNavBar';
import BottomNavBar from './BottomNavBar';
import grad from '../graduate_avatar.png';
import { useEffect } from 'react';
function HomePage(){
  
    return(
        <div className="flex justify-center">
      
      <TopNavBar/>
      <div className='cards'>
        <Card title="Inventory Directory" link='/directory' desc="Items Information" emoji="📋" img={grad}/>
        <Card title="Inventory Left" link='/inventory' desc="Items Available" emoji="📦" img={grad}/>
        <Card title="Purchases" link='/purchases' desc="Items Purchased" emoji="⬇️" img={grad}/>
        <Card title="Sales" link='/sales' desc="Items Sold" emoji="⬆️" img={grad}/>
      </div>
      <BottomNavBar active="home"/>
    </div>
    )
}
export default HomePage;