export const checkObjectValid = (object = {}, existingParams = [], checkToAllFill = false) => {
    let isValid = object && typeof object === 'object'
        && Object.keys(object) && Object.keys(object).length;

    if (existingParams && Array.isArray(existingParams) && existingParams.length) {
        for (let key of existingParams) {
            if (isValid) {
                if (!checkToAllFill) {
                    isValid = key && !!(object[key])
                } else {
                    isValid = key && object[key]
                        && (
                            (typeof object[key] === 'string' && object[key] && object[key].trim())
                            || (typeof object[key] === 'number' && !Number.isNaN(+object[key]))
                            || (Array.isArray(object[key]) && object[key].length && object[key])
                            || (
                                typeof object[key] === 'object' && Object.keys(object[key])
                                && Object.keys(object[key]).length && object[key]
                            ) || (typeof object[key] === 'boolean')
                        )
                }
            } else break;
        }
    }

    return isValid;
}

export const asyncStorageKeyEvents = async (
    method = 'get',
    key = '',
    params = {},
    callback = () => null,
) => {
    let data = {};

    try {
        if (
            key && typeof key === 'string' && key.trim()
            && method && typeof method === 'string'
            && method.trim()
        ) {
            if (method === 'get') {
                const value = await AsyncStorage.getItem(key);

                data.result = (value && JSON.parse(value)) || null;
            } else if (
                method === 'set' && params && typeof params === 'object'
                && Object.keys(params) && Object.keys(params).length
            ) {
                await AsyncStorage.setItem(key, JSON.stringify(params));
            } else if (AsyncStorage[`${method}`]) {
                await AsyncStorage[`${method}`](key, params);
            } else console.log('@@@asyncStorageKeyEvents@method Error params:', { method });
        } else console.log('@@@asyncStorageKeyEvents Error params:', { method, key, params, callback });

        callback(data);
        return data;
    } catch (e) {
        console.log('@@@asyncStorageKeyEvents:', e);
    }
}
