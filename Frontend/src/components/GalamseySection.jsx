import React, { useState } from "react";

export default function GalamseySection() {
    const [playWithSound, setPlayWithSound] = useState(false);

    return (
        <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                        Ghana’s Land Is Under Pressure
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Irresponsible mining, widely known as <strong>galamsey</strong>, is driving one
                        of the most severe environmental crises in Ghana today. According to
                        statements on the floor of Parliament, <strong>44 out of Ghana’s 288 forest
                            reserves are currently under serious attack</strong>, with over
                        <strong> 5,000 hectares of land already destroyed</strong>.
                    </p>

                    <p className="text-gray-700 mb-4">
                        The impact on water systems is even more alarming. The Ghana Water Company
                        indicates that water suitable for treatment should not exceed
                        <strong> 500 NTU</strong>. However, in heavily affected rivers, turbidity
                        levels have risen to between <strong>5,000 and 12,000 NTU </strong>
                        making treatment extremely difficult and costly.
                    </p>

                    <p className="text-gray-700 mb-4">
                        At certain points, this pollution has forced the Ghana Water Company to
                        <strong> shut down treatment plants in Tarkwa</strong>, highlighting the
                        severity of the crisis and the risk to national water security.
                    </p>

                    <p className="text-gray-700 mb-6">
                        This is not just environmental degradation, it is a systemic crisis.
                        Communities are losing access to clean water, farmland is being destroyed,
                        and thousands of young people are pushed into unsafe and unsustainable
                        livelihoods.
                    </p>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">
                        Shoova’s Solution
                    </h3>

                    <p className="text-gray-700 mb-4">
                        Shoova is working to reverse this damage by restoring degraded land,
                        training young people in sustainable skills, and building systems that
                        replace extraction with regeneration.
                    </p>

                    <p className="text-gray-700">
                        Through the planned <strong>Shoova Restoration Campus</strong>, we aim to
                        equip communities with the tools to rebuild, creating a future where
                        environmental recovery and economic opportunity go hand in hand.
                    </p>
                    <p className="text-xs text-gray-500 mt-6">
                        Source: Parliament of Ghana (Statement on the State of Forest Reserves and Water Bodies),
                        Ghana Water Company Limited (GWCL), Ministry of Lands and Natural Resources.
                    </p>
                </div>
                <div className="relative">
                    <video
                        src="/img/shoovavid.mp4"
                        className="w-full rounded-xl shadow-xl"
                        controls
                        autoPlay={!playWithSound}
                        muted={!playWithSound}
                        playsInline
                    />
                    {!playWithSound && (
                        <button
                            onClick={() => setPlayWithSound(true)}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-lg font-semibold rounded-xl"
                        >
                            ▶ Play with sound
                        </button>
                    )}
                </div>

            </div>
        </section>
    );
}