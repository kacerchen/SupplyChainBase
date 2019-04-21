/*
 Helper functions for chaincode
*/

class Helper {
    async print(iterator, allResults) {
        while (true) {
            const res = await iterator.next();
            console.log(res);
            console.log('---------------------');
            console.log(res.value);
            console.log('---------------------');

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }
}

module.exports = Helper;