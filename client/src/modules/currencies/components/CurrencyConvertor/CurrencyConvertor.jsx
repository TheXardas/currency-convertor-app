import {Autocomplete, Card} from "@mui/material";
import YourRate from "./YourRate";

export default function CurrencyConvertor() {
    return (
        <Card sx={{ height: '100%' }}>
            Currency Convertor

            <Autocomplete renderInput={(params) => null} options={[]}/>
            <Autocomplete renderInput={(params) => null} options={[]}/>


            <YourRate/>
        </Card>
    );
}