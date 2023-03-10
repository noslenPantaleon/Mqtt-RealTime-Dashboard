import styles from './sensorCard.module.scss';
import { RiPlantLine } from 'react-icons/ri';


function SensorCard({ growroom, sensorName, sensor, icon }) {


  return (
    <section className={styles.container}>
      <div className={styles.card}>
      <div className={styles.title}>       
     <h4 className={styles.title}> {sensorName}</h4>
     </div>
  
      <div className={styles.iconContainer}>

      <h1>{sensor}</h1>
    
        {icon} 
        
      </div >
      <div className={styles.growroomName}>

      {<RiPlantLine size={30} color='white' />}
   
        <h6>{growroom}</h6>
      </div>
    

   
      </div>
    </section>
  );
}

export default SensorCard;
