const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // X, Y, Z
    X = (data[2] - -3.65) / 62.72037
    Y = (data[3] - 4.9) / 7.212489
    Z = (data[4] - -291.5) / 51.6188
    return [X, Y, Z]
}

function denormalized(data){
    M1 = (data[5] * 57.19999) + 29.9325
    M2 = (data[6] * 69.3792) + 28.1475
    M3 = (data[7] * 38.08972) + 27.0325
    return [M1, M2, M3]
}


async function predict(data){
    let A = 3;
    
    data = normalized(data);
    shape = [1, A];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/Islahuddin41420110058/UAS1islahuddin/main/api/sdk/model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return denormalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
