function ItemPayment() {
    return (
        <div style={{paddingTop: '24px', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{display: 'flex'}}>
                <img style={{width: '72px', height:'48px', objectFit: 'cover', marginRight: '8px'}} src="https://c3.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,w_72,g_center,q_auto:eco,dpr_1.3,f_auto,h_48/fyaatltiv1exrm7odkcu"/>
                <div style={{fontSize: '16px', margin: 'auto 0'}}> 
                    Waste Bag x4 Rolls
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', fontSize: '16px'}}>
                <span>x2</span>
                <span style={{fontWeight: '600'}}>$319</span>
            </div>
        </div>
    );
}

export default ItemPayment;