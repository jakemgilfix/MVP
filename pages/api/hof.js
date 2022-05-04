import db from '../../firebase';

const hotdogRef = db.collection('hotdogs');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const hofHotDogs = [];

    const snapshot = await
      hotdogRef
        .orderBy('confidence', 'desc')
        .limit(10)
        .get();
    
    if (snapshot.empty) {
      console.log('No matching documents.');
      res.status(400).json({ it: "didn't work" });
    }

    snapshot.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      hofHotDogs.push(doc.data());
    })

    res.status(200).json(hofHotDogs);
  } else {
    console.log("Posting new hot dog.");
    console.log(JSON.stringify(req.body.confidence, null, 2));
    // res.status(200).json({ it: 'was received by back-end' });
    const result = await hotdogRef.add(req.body);
    console.log(result);
    res.status(200).json({})
  }
};
