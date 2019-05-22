/*
 Helper functions for chaincode
*/

class Helper {
    async print(iterator, allResults) {
        while (true) {
            const res = await iterator.next();
            // console.log(res);
            // console.log('---------------------');
            // console.log(res.value);
            // console.log('---------------------');

            if (res.value && res.value.value.toString()) {
                // console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                    console.log("Record: " + Record);
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                    console.log("Err record: " + Record);
                }
                allResults.push({ Key, Record });
                console.log("-------------------");
                console.log("All result in string: " + JSON.stringify(allResults));
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                // console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async printForMulti(iterators, allResults) {

        console.log('Start to print.')

        for(let iterator of iterators) {
            while (true) {
                const res = await iterator.next();
                // console.log(res);
                // console.log('---------------------');
                // console.log(res.value);
                // console.log('---------------------');
    
                if (res.value && res.value.value.toString()) {
                    // console.log(res.value.value.toString('utf8'));
    
                    const Key = res.value.key;
                    let Record;
                    try {
                        Record = JSON.parse(res.value.value.toString('utf8'));
                        console.log("Record: " + Record);
                    } catch (err) {
                        console.log(err);
                        Record = res.value.value.toString('utf8');
                        console.log("Err record: " + Record);
                    }
                    allResults.push({ Key, Record });
                    console.log("-------------------");
                    console.log("All result in string: " + JSON.stringify(allResults));
                }
                if (res.done) {
                    console.log('end of iterator' + iterator);
                    await iterator.close();
                    // console.info(allResults);
                }
            }
        }
        
        return JSON.stringify(allResults);
    }
}

module.exports = Helper;