import { PopUpZoho } from "./PopUpZoho";
import '../../css/App.css';
export default function CardMapper ({data}) {
    return (
        <div className="mapper_container">
            {data ? data.map(item =><Card key={item.id} item={item} />) : <h2>Cargando...</h2>}
        </div>
    )
}

function Card ({item}) {
    let data = item;
    return (<div className="mapper_card">
        <div className="mapper_card_info">
            <div>LogoUser {data.Full_Name ? data.Full_Name : data.Account_Name}</div>
            <div>{data.Phone}</div>
            <div>{data.Email ? data.Email : data.Website}</div>
        </div>
        <PopUpZoho data={data} viewFrom={data.Full_Name ? "clients" : "accounts"} />
    </div>)
}

//Contacts : Full_Name, Phone, Email 
//Accounts : Account_Name, Phone, Website