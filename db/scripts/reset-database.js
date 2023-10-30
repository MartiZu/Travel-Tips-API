import { pool } from "../index.js";

async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
      DROP TABLE IF EXISTS travel CASCADE;

    `);

    // Create the frontend table
    await pool.query(`
      CREATE TABLE travel (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        city VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        best_time_to_visit VARCHAR(255) NOT NULL,
        fun_fact VARCHAR(255) NOT NULL,
        imglink VARCHAR(255) NOT NULL,
        not_to_miss VARCHAR(255) NOT NULL
      );
    `);

    //Seed the users table
    await pool.query(`
    INSERT INTO travel (city, country, best_time_to_visit, fun_fact, imglink, not_to_miss)
    VALUES
    ('Auckland', 'New Zealand', 'December to February', 'Auckland is the largest city in New Zealand and is known for its stunning natural landscapes, including volcanic cones, beautiful harbors, and nearby islands. It offers a mix of outdoor adventures and urban experiences.', 'https://upload.wikimedia.org/wikipedia/commons/4/47/Auckland_skyline_from_harbor_bridge%2C_20_September_2019.jpg', 'https://www.lonelyplanet.com/new-zealand/auckland'),
    ('Bangkok', 'Thailand', 'Winter', 'Bangkok''s full name is the longest city name in the world, consisting of 169 characters.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Bangkok_Montage_2021.jpg/800px-Bangkok_Montage_2021.jpg', 'https://www.lonelyplanet.com/thailand/bangkok'),
    ('Dublin', 'Ireland', 'Summer', 'Dublin''s Temple Bar district is known for its vibrant nightlife and is a popular destination for live music and entertainment.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Samuel_Beckett_Bridge_At_Sunset_Dublin_Ireland_%2897037639%29_%28cropped%29.jpeg/390px-Samuel_Beckett_Bridge_At_Sunset_Dublin_Ireland_%2897037639%29_%28cropped%29.jpeg', 'https://www.lonelyplanet.com/ireland/dublin'),
    ('London', 'United Kingdom', 'Summer', 'London is home to the world''s oldest underground railway system, known as the London Underground or the Tube.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/1024px-London_Skyline_%28125508655%29.jpeg', 'https://www.lonelyplanet.com/england/london'),
    ('Tokyo', 'Japan', 'Spring', 'Tokyo is the most populous city in the world, with over 37 million people living in the Greater Tokyo Area.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/1024px-Skyscrapers_of_Shinjuku_2009_January.jpg', 'https://www.lonelyplanet.com/japan/tokyo'),
    ('Paris', 'France', 'Spring and Autumn', 'Paris is nicknamed the City of Light, not because of its electricity usage, but because it was one of the first cities in the world to have street lighting.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1024px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg', 'https://www.lonelyplanet.com/france/paris'),
    ('New York City', 'United States', 'Spring and Autumn', 'New York City is known as the Big Apple, a nickname that originated in the 1920s and refers to the city''s popularity and success.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/1920px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg', 'https://www.lonelyplanet.com/usa/new-york-city'),
    ('Rome', 'Italy', 'Spring and Autumn', 'Rome is home to the smallest country in the world, Vatican City, which is an independent city-state enclaved within Rome.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Colosseum_in_Rome-April_2007-1-_copie_2B.jpg/1920px-Colosseum_in_Rome-April_2007-1-_copie_2B.jpg', 'https://www.lonelyplanet.com/italy/rome'),
    ('Sydney', 'Australia', 'Spring and Autumn', 'Sydney is home to the Sydney Opera House, one of the most famous and distinctive buildings in the world.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/1920px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg', 'https://www.lonelyplanet.com/australia/sydney'),
    ('Cairo', 'Egypt', 'Spring and Autumn', 'Cairo is home to the Great Pyramid of Giza, the oldest and largest of the three pyramids in the Giza pyramid complex.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/1280px-All_Gizah_Pyramids.jpg', 'https://www.lonelyplanet.com/egypt/cairo'),
    ('Rio de Janeiro', 'Brazil', 'Summer', 'Rio de Janeiro is known for its iconic statue of Christ the Redeemer, which stands atop the Corcovado mountain and overlooks the city.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cidade_Maravilhosa.jpg/1920px-Cidade_Maravilhosa.jpg', 'https://www.lonelyplanet.com/brazil/rio-de-janeiro'),
    ('Dubai', 'United Arab Emirates', 'Winter', 'Dubai is home to the world''s tallest building, the Burj Khalifa, which stands at a height of 828 meters (2,717 feet).', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Dubai_Marina_Skyline.jpg/1024px-Dubai_Marina_Skyline.jpg', 'https://www.lonelyplanet.com/united-arab-emirates/dubai'),
    ('Moscow', 'Russia', 'Summer', 'Moscow is home to the Red Square, a UNESCO World Heritage Site and a historic center of the city.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Saint_Basil%27s_Cathedral_and_the_Red_Square.jpg/1024px-Saint_Basil%27s_Cathedral_and_the_Red_Square.jpg', 'https://www.lonelyplanet.com/russia/moscow'),
    ('Barcelona', 'Spain', 'Spring and Autumn', 'Barcelona is famous for its unique architecture, including the iconic works of Antoni Gaudí, such as the Sagrada Família and Park Güell.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Casa_Mil%C3%A0%2C_general_view.jpg/1024px-Casa_Mil%C3%A0%2C_general_view.jpg', 'https://www.lonelyplanet.com/spain/barcelona'),
    ('Istanbul', 'Turkey', 'Spring and Autumn', 'Istanbul is the only city in the world that straddles two continents, Europe and Asia, with the Bosphorus Strait separating the two.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Aya_Sophia_%287144824757%29_%28cropped%29.jpg/1024px-Aya_Sophia_%287144824757%29_%28cropped%29.jpg', 'https://www.lonelyplanet.com/turkey/istanbul'),
    ('Mumbai', 'India', 'Winter', 'Mumbai is the financial capital of India and is home to Bollywood, the largest film industry in the world.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/1024px-Mumbai_03-2016_30_Gateway_of_India.jpg', 'https://www.lonelyplanet.com/india/mumbai-bombay'),
    ('Cape Town', 'South Africa', 'Summer', 'Cape Town is famous for its stunning natural beauty, including Table Mountain and the Cape of Good Hope.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Cape_Town_Mountain.jpg/1024px-Cape_Town_Mountain.jpg', 'https://www.lonelyplanet.com/south-africa/cape-town'),
    ('Seoul', 'South Korea', 'Spring and Autumn', 'Seoul is known for its cutting-edge technology, vibrant street food culture, and ancient palaces, such as Gyeongbokgung and Changdeokgung.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Seoul_%28175734251%29_%28cropped%29.jpg/1024px-Seoul_%28175734251%29_%28cropped%29.jpg', 'https://www.lonelyplanet.com/south-korea/seoul'),
    ('Mexico City', 'Mexico', 'Spring', 'Mexico City is one of the largest cities in the world and is home to the ancient Aztec ruins of Templo Mayor.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Z%C3%B3calo%2C_Ciudad_de_M%C3%A9xico_%2832846556446%29_%28cropped%29.jpg/1024px-Z%C3%B3calo%2C_Ciudad_de_M%C3%A9xico_%2832846556446%29_%28cropped%29.jpg', 'https://www.lonelyplanet.com/mexico/mexico-city'),
    ('Amsterdam', 'Netherlands', 'Spring and Summer', 'Amsterdam is famous for its picturesque canals, historic houses, and world-class museums, such as the Van Gogh Museum and the Anne Frank House.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg/1024px-KeizersgrachtReguliersgrachtAmsterdam.jpg', 'https://www.lonelyplanet.com/netherlands/amsterdam'),
    ('Singapore', 'Indonesia', 'Year-round', 'Singapore is known as the Garden City for its abundance of green spaces and is home to the iconic Marina Bay Sands resort.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/JewelSingaporeVortex1.jpg/1024px-JewelSingaporeVortex1.jpg', 'https://www.lonelyplanet.com/singapore/singapore'),
    ('Toronto', 'Canada', 'Summer', 'Toronto is the largest city in Canada and is known for its diverse culture, iconic landmarks like the CN Tower, and the Toronto International Film Festival.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/CC_2022-06-18_193-Pano_%28cropped%29_01.jpg/1024px-CC_2022-06-18_193-Pano_%28cropped%29_01.jpg', 'https://www.lonelyplanet.com/canada/toronto'),
    ('Hanoi', 'Vietnam', 'Spring and Autumn', 'Hanoi is the capital of Vietnam and is famous for its rich history, French colonial architecture, and delicious street food, including pho and banh mi.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/L%C4%83ng_Ch%E1%BB%A7_t%E1%BB%8Bch_H%E1%BB%93_Ch%C3%AD_Minh.jpg/1024px-L%C4%83ng_Ch%E1%BB%A7_t%E1%BB%8Bch_H%E1%BB%93_Ch%C3%AD_Minh.jpg', 'https://www.lonelyplanet.com/vietnam/hanoi'),
    ('Berlin', 'Germany', 'Summer', 'Berlin is a city with a rich history and a thriving arts scene. It is known for its iconic landmarks like the Brandenburg Gate, the Berlin Wall, and the vibrant street art.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Brandenburger_Tor_abends.jpg/1024px-Brandenburger_Tor_abends.jpg', 'https://www.lonelyplanet.com/germany/berlin'),
    ('Buenos Aires', 'Argentina', 'Spring and Autumn', 'Buenos Aires is the capital of Argentina and is famous for its tango music and dance, vibrant nightlife, and European-inspired architecture.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Caminito_en_Buenos_Aires_%2831408%29.jpg/800px-Caminito_en_Buenos_Aires_%2831408%29.jpg', 'https://www.lonelyplanet.com/argentina/buenos-aires'),
    ('Stockholm', 'Sweden', 'Summer', 'Stockholm is known as the ''Venice of the North'' due to its numerous islands and canals. It is a city with a rich cultural heritage, modern design, and beautiful natural surroundings.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/View_of_Stockholm-170351.jpg/1024px-View_of_Stockholm-170351.jpg', 'https://www.lonelyplanet.com/sweden/stockholm'),
    ('Cusco', 'Peru', 'Dry season', 'Cusco was the capital of the Inca Empire and is now a gateway to the famous Machu Picchu. It has a blend of Inca and Spanish colonial architecture and is surrounded by stunning landscapes.', 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Cusco%2C_Peru.png', 'https://www.lonelyplanet.com/peru/cusco'),
    ('Marrakech', 'Morocco', 'Spring and Autumn', 'Marrakech is a bustling city in Morocco known for its vibrant markets, traditional architecture, and rich cultural heritage. It is famous for its vibrant souks and the iconic Jardin Majorelle.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Djemaa_el_Fna.jpg/1024px-Djemaa_el_Fna.jpg', 'https://www.lonelyplanet.com/morocco/marrakech'),
    ('Vancouver', 'Canada', 'Summer', 'Vancouver is a coastal city in Canada known for its stunning natural beauty, including mountains, forests, and the Pacific Ocean. It is a vibrant city with a thriving arts and food scene.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Science_world_%28focusedcapture%29_2_-_Flickr.jpg/1024px-Science_world_%28focusedcapture%29_2_-_Flickr.jpg', 'https://www.lonelyplanet.com/canada/vancouver'),
    ('Budapest', 'Hungary', 'Spring and Autumn', 'Budapest is the capital of Hungary and is famous for its stunning architecture, thermal baths, and the beautiful Danube River. It is a city that offers a mix of history, culture, and culinary delights.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Budapest_Hungarian_Parliament_%2831363963556%29.jpg/1024px-Budapest_Hungarian_Parliament_%2831363963556%29.jpg', 'https://www.lonelyplanet.com/hungary/budapest'),
    ('Krakow', 'Poland', 'Spring and Autumn', 'Krakow is a historic city in Poland known for its well-preserved medieval architecture and rich cultural heritage. It is home to the famous Wawel Castle and the historic Old Town.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Krakow_Rynek_Glowny_panorama_2.jpg/1024px-Krakow_Rynek_Glowny_panorama_2.jpg', 'https://www.lonelyplanet.com/poland/krakow'),
    ('San Francisco', 'United States', 'Spring and Autumn', 'San Francisco is a vibrant city in California known for its iconic Golden Gate Bridge, hilly landscape, and diverse culture. It is a hub for technology, arts, and culinary experiences.', 'https://upload.wikimedia.org/wikipedia/commons/6/61/San_Francisco_from_the_Marin_Headlands_in_August_2022.jpg', 'https://www.lonelyplanet.com/usa/san-francisco'),
    ('Athens', 'Greece', 'Spring and Autumn', 'Athens is the capital of Greece and is famous for its ancient history and iconic landmarks, including the Acropolis, the Parthenon, and the Temple of Olympian Zeus.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/The_Acropolis_from_Mount_Lycabettus_on_October_5%2C_2019_%28cropped%29.jpg/1024px-The_Acropolis_from_Mount_Lycabettus_on_October_5%2C_2019_%28cropped%29.jpg', 'https://www.lonelyplanet.com/greece/athens'),
    ('Copenhagen', 'Denmark', 'Summer', 'Copenhagen is the capital of Denmark and is known for its beautiful canals, historic architecture, and progressive design. It is a city that prides itself on sustainability and quality of life.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Nyhavn-panorama.jpg/1024px-Nyhavn-panorama.jpg', 'https://www.lonelyplanet.com/denmark/copenhagen')
`);

    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

await resetDatabase();
