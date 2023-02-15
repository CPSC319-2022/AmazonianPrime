import { Grid, Select, MenuItem } from '@mui/material';

function Details() {
    return (
        <div>
            <h3 className="product-details">Details</h3>
            <Grid container rowSpacing={0} fontSize="small">
                <Grid item xs={3}>
                    <p id="condition">Condition</p>
                </Grid>
                <Grid item xs={9}>
                    <p id="condition-val">2 Years - Good</p>
                </Grid>
                <Grid item xs={3}>
                    <p id="size">Size</p>
                </Grid>
                <Grid item xs={9}>
                    <p id="size-val">1.5m</p>
                </Grid>
                <Grid item xs={3}>
                    <p id="brand">Brand</p>
                </Grid>
                <Grid item xs={9}>
                    <p id="brand-val">N/A</p>
                </Grid>
                <Grid item xs={3}>
                    <p id="colour">Colour</p>
                </Grid>
                <Grid item xs={9}>
                    <p id="colour-val">Green</p>
                </Grid>
                <Grid item xs={3}>
                    <p id="quantity">Quantity</p>
                </Grid>
                <Grid item xs={9}>
                    <Select id="select" defaultValue={1} size="small">
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                    </Select>
                </Grid>
            </Grid>
        </div>
    )
}

export default Details;