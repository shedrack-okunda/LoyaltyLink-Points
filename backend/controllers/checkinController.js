const User = require("../models/User");
const Visit = require("../models/Visit");

exports.checkIn = async (req, res) => {
  const { phone } = req.body;
  try {
    let user = await User.findOne({ phone });

    if (!user) {
      user = new User({ phone });
      await user.save();
    }

    user.points += 1;
    if (user.points >= 10) {
      user.rewardEarned = true;
    }
    await user.save();

    const visit = new Visit({ user: user._id });
    await visit.save();

    const visitHistory = await Visit.find({ user: user._id })
      .sort({ date: -1 })
      .limit(10);

    res.json({
      success: true,
      points: user.points,
      rewardEarned: user.rewardEarned,
      visits: visitHistory.map((v) => ({
        date: v.date.toDateString(),
        time: v.date.toLocaleTimeString(),
        points: v.points,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.claimReward = async (req, res) => {
  const { phone } = req.body;
  try {
    const user = await User.findOne({ phone });
    if (!user || !user.rewardEarned)
      return res.status(400).json({ error: "No reward available" });

    user.points = 0;
    user.rewardEarned = false;
    await user.save();

    res.json({ message: "Reward claimed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
