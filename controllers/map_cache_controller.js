const short_cache_map = new Map();
const long_cache_map = new Map();



function add_to_cache(mapType,short,long){
    if(mapType == 'shortMap'){
            short_cache_map.set(short,{
            url : long,
            expiresAt : Date.now() + (300)*1000
        })
        return;
    }

    long_cache_map.set(long,{
            code : short,
            expiresAt : Date.now() + (300)*1000
        })

    
    
}

function get_from_cache(mapType,short,long){
    if(mapType == 'shortMap'){
        return short_cache_map.get(short);
    }
    return long_cache_map.get(long)
    
}

module.exports = {short_cache_map,long_cache_map, add_to_cache,get_from_cache}