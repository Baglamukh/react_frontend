import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Siri from '@/components/Siri';
import CustomBottomNavbar from '@/components/BottomNavbar';

const prasnawaliData = {
    "Jin kevali Parshnawali" : {
        "1-1": "Desired results, increase in wealth, good health, worry will gel, desired thing will be beneficial, all plans will be successful, welfare.",
        "1-2": "Problem will go away, bliss after five, unexpected gains, gone away person will come back in few days, disease.",
        "1-3": "Grave problems will go away, don't worry. Don't indulge in buying and selling. One man desires harm to you but he will not be able to do anything. Still, remain vigilant.",
        "1-4": "Agony will go away, by god's mercy every thing will be all right. Bliss may be after few days. Your desires will be fulfilled, immediate profits are likely.",
        "1-5": "Desired wishes will be fulfilled, grave disease if present will go. The desire of going to another city will be fulfilled, it will be beneficial. Success can be achieved by efforts and devotion to god.",
        "2-1": "A problem has cropped up, don't worry about it. Success will be achieved. The conflicts will go away, danger will vanish. Good development is likely.",
        "2-2": "Work will be performed well, don't rely on others. Hurdles will be removed, remain assured. Don't tell the ideas of your mind to anyone. Keep patience for nine days. If you desire for early completion of work then indulge in religion, charity and noble deeds for seven days. Otherwise work may get delayed.",
        "2-3": "The work may be hampered, enemy will cause harm. Remain quiet and don't speak for seven days in your city. For success in your work do more charity and noble deeds for one month.",
        "2-4": "You will get back your money, problems or loss will leave. You have noble plans in your mind that will be successful. If you have indulged in some discussion with someone, don't fear about it. Lost thing will be recovered, money will be earned. If you wish to go out of city, go after ten days. Victory is there in west.",
        "2-5": "The danger will be small but don't remain innocent. Remain alert against your neighbor. Do your work after careful thinking. Don't talk to wicked men. The worries that you have in mind will be solved afterwards.",
        "3-1": "You have thought of going out of city therefore go. It will be good. You will have bliss after suffering from betrayal.",
        "3-2": "What you have decided is not good, don't do it. The next twenty days are medium. Don't go out of city otherwise it may be harmful. I am telling this to you 108 times.",
        "3-3": "Your desire will be fulfilled. Remain assured, don't worry. After the desired result the trading will be profitable. If you have ideas of marriage or of growth in business, do it. It will be beneficial.",
        "3-4": "All your jobs will be successful. The planets are beneficial. Remain quiet for few days. All your jobs will be successful. Don't trust anyone for your money. Success will be achieved after ten days.",
        "3-5": "Prestige will increase, glory will be everywhere. The enemy will fall on your feet. Your relatives and brothers think against you, they will be defeated. Good days are ahead.",
        "4-1": "The agony will go, you will have happiness. You will get a very good place. Your family members will be joyous. Your worry will go after seven days.",
        "4-2": "Your influence will increase. The wicked persons will leave wickedness and will become your friends. You will be a chief in your family. Desire will be fulfilled. Trust it.",
        "4-3": "All desires will be fulfilled. The disease and restlessness will leave. A place outside the city will be beneficial, lost thing will be recovered.",
        "4-4": "Your glory will increase. Relations with a good person will develop. Money will come. Pleasure and bliss will be there which will be good. You may spend money on desired work. Going out of city in west will give desired profits. Desire will be fulfilled in seven days.",
        "4-5": "Your prestige and importance will increase. Health will be good. You may have partnership with an important person in business. If you have an enemy he will leave enmity and will ask for your pardon with folded hands. Great gains are likely. If you wish to go out of city you may go. Wealth will be earned.",
        "5-1": "Your desire will be fulfilled, it will be good. Your wish to get something from others will be successful but after sometime. Therefore remain cautious. The idea of going out of city is good.",
        "5-2": "Nine months are difficult therefore do not reveal thoughts of your mind to anyone. Do anything only after determining the planets and omens. Good days will come later.",
        "5-3": "Your luck has woken up. Worries will be over. Desired results are likely.",
        "5-4": "Keep patience for sometime, work after few days, don't keep relations with too many people. Don't quarrel. This is essential for your welfare.",
        "5-5": "Work will be successful. Going to another city will render special benefits. Indulge in religion, charity and noble deeds. Whatever you do, do after careful thinking. Don't hurry. Your desire will be successful after one month."
      },
     "Ramal Nakshatra" :  {
        "Asvini": "Gain of money, profits in business, good health.",
        "Mrgsra": "Danger, disturbance by enemy, loss of money.",
        "Aslesa": "Troubles will increase, danger, loss of health and materials, agony in journey.",
        "Hasta": "Destruction of wealth, clothes, diseases, gains from foreign lands.",
        "Anurad": "Increase in foolish thoughts, loss of money, journey to foreign lands, disease, worries at every step.",
        "U.Sadh": "Birth of a child, increase in influence, joys.",
        "Satbis": "Wealth, prosperity, joys of spouse, bliss, satisfaction.",
        "Bharni": "Conflicts, restlessness, increase in worries, losses.",
        "Ardra": "Gain of kingdom and wealth, gain from others.",
        "Magha": "Gain of money, success in important project, increase in coffers.",
        "Chitra": "Gain of money, birth of son, auspicious death, increase in affection.",
        "Jyestha": "Gain of money and friends, destruction of disease and terror, victory in conflict.",
        "Abhijit": "Profits from the road, palace, worry, gain of money.",
        "P.bhad": "Heavy profits, fulfillment of desire, gain of son and wealth.",
        "Kritti": "Stomach disorders, diseases, clashes.",
        "Purnrbs": "Eternal satisfaction, gains and pleasures from spouse, increase in affection.",
        "P.phal": "Gain of kingdom, increase in wealth, increase in luck and gain of desired thing.",
        "Swati": "Gain of wealth, tremendous earnings, increase in prestige and status and reunion with friends.",
        "Moola": "Loss of money and prestige, sorrows, agonies, evil spirits on mind, danger of thief.",
        "Sravan": "Pilgrimage, reunion with brothers, great affection, satisfaction.",
        "U.Bhad": "Dissatisfaction, loss of money, clashes, agony.",
        "Rohini": "Gain of religious benefits, contentment, auspicious death.",
        "Pushya": "Wealth of all kinds, palace, success in all ventures.",
        "U.Phal": "Joys, gain of wealth, heavy gains of all types.",
        "Vishakha": "Very good profits in one month, unnoticed gains, birth of son, receipt of wealth, attachment with respected persons, celebrations.",
        "P.saad": "Gain of other's wealth, prosperity, bliss, auspicious death, increase in stature.",
        "Ghanesh": "Absence of pleasures, loss of prestige, conflicts, disease.",
        "Revti": "Gain of wealth, bliss and satisfaction."
      },
     "Unknown Parashnawali" :  {
        "1-1": "11 - Your works will be fulfilled.",
        "1-2": "12 - Your work will be delayed but after god worships.",
        "1-3": "13 - Work will not be completed successfully.",
        "1-4": "14 - Work will be completed.",
        "1-5": "15 - Wishes will be fulfilled.",
        "2-1": "21 - Work will be completed when free of tensions and you will live long.",
        "2-2": "22 - Work will be completed in your capacity.",
        "2-3": "23 - Work will not be completed successfully.",
        "2-4": "24 - Work will be completed with grace.",
        "2-5": "25 - Work will be completed with physical hardships, Don't rely too much on others.",
        "3-1": "31 - Work will be completed, profit is indicated in the business.",
        "3-2": "32 - Good omens are indicated after loss.",
        "3-3": "33 - Leave this work, it is a waste.",
        "3-4": "34 - Work completion is indicated with hard work mixed with respect.",
        "3-5": "35 - Work will not be completed.",
        "4-1": "41 - Work will be completed undoubtedly.",
        "4-2": "42 - Work will be completed with hard-work.",
        "4-3": "43 - Work will certainly be completed.",
        "4-4": "44 - Your work in North & West direction will be completed with lesser hard-work.",
        "4-5": "45 - Your work is great & will be completed with somebody's help.",
        "5-1": "51 - Work will be completed, and you will be blessed in your effort.",
        "5-2": "52 - Your wishes will be fulfilled.",
        "5-3": "53 - You secretly do your work, better fortunes are indicated.",
        "5-4": "54 - Your work will be delayed because of your enemy.",
        "5-5": "55 - All your work will be completed successfully."
      },
     "Pasavli" :  {
        "111": "Dear querist, this period is good. All your deeds will be beneficial and successful. Victory is there in conflicts. You will earn money in trade and all desires will be fulfilled.",
        "131": "Dear querist, this is a very good period. There will be all round development. Victory in battle, gain of wealth, spouse and son are likely. The lost article will be recovered. All your desires will be fulfilled soon.",
        "211": "You have planned a big enterprise that will be successful. Do what you have decided. You have worries about a two legged which will be over. Religious activities will take place.",
        "231": "You will get wealth and son. Your desire will be fulfilled. Worship family goddess, you will get state honors.",
        "311": "Your luck has arisen. Trading in another city will be fruitful. Immense profits are likely. Do noble and religious deeds, don't lose heart.",
        "331": "Dear querist, your planned work will be successful. The expansion of family, receipt of wealth and clothes, robust health and recovery of lost thing are likely.",
        "411": "Dear querist, your desire will not be fulfilled in near future. The present period is not good and you are in trouble. In such moments even dear ones become strangers. You are suffering from loss of money, worry of funds and disease. You have faced troubles for last seven years. Don't lose heart; serve gods and guru that can destroy bad luck.",
        "431": "Dear querist, your ventures will be successful. Your family will expand. Receipt of wealth, birth of son and contact with noble person are indicated. Your health will be good.",
        "132": "All your plans will be successful, therefore hurry up. Lost thing will be recovered, troubles will go away.",
        "212": "Dear querist, expansion of house, birth of a child, help from a noble person, marriage, gain of gold, victory in dispute, wealth of all kinds will be yours. Your desire to go out of city can be successful by worship of family god so that you can earn money.",
        "232": "Your desire will not be fulfilled you have worries, disturbance and excitement in abundance. You wish to go out of town but it will not be materialized. Keep patience for few days.",
        "312": "Your desire will be fulfilled. Reunion with noble relative is likely. Planned work will materialize. One man is envious of you, don't be afraid of him. Your fate line is good.",
        "332": "Worries, danger from enemy and rulers are indicated. Don't start anything new otherwise loss is certain.",
        "412": "Dear querist, the work that you have begun will be profitable. Don't feel dejected; your fate line is good. You have worries about money that will vanish.",
        "432": "Dear querist, your desire will be fulfilled in a month. Lost article will be recovered. Initially you will have setbacks but success will follow. You have plans to go out of town. Don't do so otherwise loss is indicated. Don't trust anyone and remain vigilant in journey.",
        "113": "Dear querist, you will get wealth. There will be reunion with dear ones. The planned jobs will be done. You will get property and desired thing. Bad days have gone and good days are here.",
        "133": "Troubles everywhere and diseases are likely. You have worries about king, child and expulsion form country that will persist. There will be big hurdles in your work and you will have to undergo many agonies.",
        "213": "Your worry about a two legged will be over within two months. There will be reunion with brothers. Your body will be robust. Worship gods, guru and your elder to get your desires fulfilled.",
        "233": "Dear querist, you have much worries and agony. Your bad days are here. You will have to face opposition in family. Even noble people will become your enemies. Remain alert, you have many foes.",
        "313": "You have anxiety to get money for last three months and cannot forget it. This will go away slowly. You are kind hearted. Many people are envious of you.",
        "333": "The planned work will materialize. You will have wealth and a son. Your desires will be fulfilled. Bad days have gone. Attachment with friend will increase and contact with noble persons will be made. Success will be achieved in most difficult jobs.",
        "413": "Dear querist, good days are ahead. You will have gains of money, contact with noble persons, glory and good health. Your desires will be fulfilled. Worries will vanish in a month. Going out of city will be beneficial. A person is jealous of you but do not worry. However, remain alert about him.",
        "433": "Dear querist, your desire will not be fulfilled. Whatever work you do, think carefully before doing it. You are greedy. You will have loss of money and danger from state. Worship guru and family god, Good days will come after two months.",
        "114": "Your family will expand. There will be joys. Gain of son, wealth and land are likely. All your desires will be fulfilled during next three months. Worship guru and family goddess.",
        "134": "Dear queries, you will be honored by the king and ministers. Your desire to go abroad will be fulfilled. The enemies will be defeated. Reunion with brothers and dear ones is likely. Worship family gods and guru that will make you blessed. Your desire will be fulfilled in seven days.",
        "214": "Your worry will vanish. Body will be stout. Worry of the four legged will go away. Money will be received. Benefits from state are indicated.",
        "234": "Your worries will go away. Indulge in industry. Going to another city will be beneficial. Wealth will be gained. You will meet noble people.",
        "314": "You will have all benefits by blessings of your guru. Celebrations are indicated. You will meet friends and relatives. Worries will vanish. Honors from king and guru are yours. A big calamity will be deferred. Indulge in religion that will give benefits of all kinds.",
        "334": "The planned work will not be fruitful. Loss of life and goods are there. Remain alert. Plenty of worries are foretold. Your enemy has made his move. Remain vigilant. Devote your time in religion. Don't lose heart.",
        "414": "Dear querist, your worry will be over in a month. Good days are ahead. Contact with noble persons, gain of money and good health are indicated.",
        "434": "Dear querist, your worry will go away slowly. You have fear of a person that will disappear. You will be able to pay loans.",
        "121": "You will get property and meet dear ones. The planned work will be completed without any hassle.",
        "141": "Dear querist, your disease will be cured. There will be happiness. The seventh day is very lucky and auspicious.",
        "221": "Dear querist, you have been suffering for three years. You could not live peacefully. You desire welfare, money and high status. Your bad days are over and all round happiness is indicated.",
        "241": "Dear querist, your desire will be fulfilled, worries will vanish. You will have a daughter and wealth. Good days have come. Invite all neighbors and friends on lunch that will render all blessings.",
        "321": "Your days are not good. If you touch gold it becomes mud. Remain alert. Your planned work will not be done. Danger from rulers is indicated. Problem will persist for one month.",
        "341": "Dear querist, your desires will be fulfilled. Worries will vanish. Your persistent anxiety will go in 25 days. Wealth will be received. Meet noble persons.",
        "421": "Dear querist, your planned work will be accomplished. You have taken a good decision, wealth will come. Worries will go away. Body will be healthy. Give clothes and utensils to guest.",
        "441": "Dear querist, why are you acting stupid. Your desire will not be fulfilled, your time is unfavorable, the fate line is also bad, planets are adverse. Therefore, leave this project. There will be loss of money and emergency of disease.",
        "122": "Success in plan, gains of property, prestige, reunion with dear ones are likely. Bad days have gone and good days are here, good gains are likely after one month.",
        "142": "Dear querist, your desired work will be done soon. Your worries about earnings and family will be over after two months.",
        "222": "Opposition from relatives, attachment with enemies and differences with friends are likely. Health problems will crop up. You always think of evil deeds therefore you are likely to suffer. The present period is unfavorable for you. Worship gods and guru with a sacred heart to go rid of your troubles.",
        "242": "You wish to go back to home and worry about cattle. Your worries will vanish. You may take loans. State honors are indicated.",
        "322": "Your desire will not be fulfilled for sometime. Don't hurry. If you do so there will be opposition in the family. Remain alert; otherwise there will be loss of money. Don't blame at that time.",
        "342": "Your planned work will be fruitful. Your worries and problems will be over.",
        "422": "Your planned work will be completed successfully. You will be honored. There will be good health and profits.",
          "123": "Your worries and problems will go away. You will be honored and enjoy good health. Your business will be profitable.",
         "243": "You will meet your desires. There will be prosperity and success in your endeavors.",
         "323": "Your planned work will be completed successfully. There will be gains and you will enjoy good health. Your worries will go away.",
       "343": "Your planned work will be completed successfully. You will enjoy success and prosperity.",
         "423": "You will meet your desires and there will be success in your endeavors."
         },
     "Yugadi Dev Prashnawali" :  {
        "A": "If 'A' comes, then take it for granted that victory, profit, learning, luxury, wealth and spouse will be gained; you will be blessed with a son and overall welfare is likely.",
        "J": "If 'J' comes then remember that losses are likely, success is denied. There will be differences with friends and possibilities of imprisonment and death exist.",
        "Chha": "If 'Chha' comes then gain of flag, gems, crown is expected. Good health and receipt of land is also there.",
        "Cha": "'Cha' indicates victory gains, honor from rulers, and welfare in all respects and success in endeavors.",
        "Ada": "'Ada' indicates loss of wealth, great fear, will require too much work, loss of job and failure in plan.",
        "Ri": "If 'Ri' comes then it indicates gain of kingdom and gems of different types, success in all endeavors and reunion with family members.",
        "AA": "If 'AA' is there, grief, repentance, fear, quarrel, opposition, destruction and terrible disease are likely.",
        "Jha": "If 'Jha' comes then gain of gold and silver, good luck, receipt of land and success in venture are on the cards.",
        "Bha": "'Bha' indicates gains of money and delicious foods; success in all endeavors and you will ever be free of fear.",
        "B": "'B' indicates imprisonment, conflicts, and fear from rulers, death and expulsion from country.",
        "F": "'F' denotes gains, good luck, receipt of wealth, victory, welfare and good health.",
        "P": "If 'P' comes it means loss of money, murder, imprisonment, severe problems, addictions and madness.",
        "E": "If 'E' is there then luxuries and gain of a son are likely soon. Wealth, learning and success of all kinds will be achieved and safe journey back to hometown is predicted.",
        "Nya": "If 'Nya' comes then conflicts, disease, murder, imprisonment, unfortunate incidents and loss of money are likely.",
        "M": "'M' indicates imprisonments, difficulties at every place, serious disease and failure in effort.",
        "S": "If 'S' comes it means failure in ventures, great danger and absence of success in all jobs.",
        "Sha": "If 'Sha' comes it means gain of wealth, blessing of rulers and birth of a son.",
        "N": "'N' indicates grave danger, loss of money, weakening of luck, perils and failure in all enterprises.",
        "EE": "If 'EE' is there, profits in all ventures, remarkable progress, success in all endeavors, and reunion with friends are likely.",
        "T": "If 'T' comes then loss of money, hurdles, grief, sorrows and failure in all ventures are likely.",
        "Y": "'Y' indicates glory, wealth, and prosperity. The wicked enemy will become your servant and journey will be successful.",
        "H": "'H' indicates freedom from problems, getting success of all kinds, all desires fulfilled as per the requirements.",
        "Dha": "'Dha' indicates gain of wealth, improvements in lifespan and health, success in endeavors and good luck in every sphere.",
        "U": "If 'U' comes, grief, repentance and hurdles are likely. Grave problems are in the offing and a weapon may strike you.",
        "Thai": "'Tha' indicates that you will get a beautiful pitcher, eight types of wealth and luxuries and your disease will be cured.",
        "R": "If 'R' comes, it indicates grief, sorrows, conflicts, separation, loss of money and death.",
        "L": "'L' indicates profits, addition in family members, good progress, good luck, receipt of desired thing and honor from king.",
        "V": "'V' indicates loss in work.",
        "D": "If 'D' comes it denotes loss of job, grief, conflict with wife, guilt, person gone away will not come back and separation from brothers.",
        "OO": "If 'OO' is there you will receive items of luxury and comforts. Good esteem, success in all ventures, well-being and victory are on the cards.",
        "Ana": "'Ana' denotes success in all ventures, gain of desired products and wealth, will get peace, good health and success.",
        "TT": "'TT' indicates what you have learnt will be forgotten soon, the gone persons will not come back, mind will be wavering, bad luck and loss of money.",
        "Tha": "'Tha' indicates luxuries of various kinds, victory, sound health, success in journey and in all endeavors."
      },
      "Vinod Manjari" : {
        "Ari": "Happiness will prevail.",
        "Tau": "Some monetary gains are indicated.",
        "Gem": "Sorrow will prevail.",
        "Can": "Indra-like gains are indicated.",
        "Leo": "Enemies will be defeated.",
        "Vir": "Sign of happiness.",
        "Lib": "Tensions will prevail.",
        "Pis": "Desires will be fulfilled and all blockages will be removed.",
        "Cap": "Sign of sorrow.",
        "Sco": "Hopeful.",
        "Sag": "You will get your desires fulfilled.",
        "Aqu": "Will gain expertise."
      },
      "Box Of 15" : {
        "1": "You Clicked On 1, this Indicates monetary gains.",
        "2": "You Clicked On 2, this Indicates monetary losses.",
        "3": "You Clicked On 3, this Indicates friendly gains.",
        "4": "You Clicked On 4, this Indicates tensions.",
        "5": "You Clicked On 5, this Indicates Kingly honours.",
        "6": "You Clicked On 6, this Indicates work loss is indicated.",
        "7": "You Clicked On 7, this Indicates Property & monetary gains.",
        "8": "You Clicked On 8, this Indicates death or troubles equalling death.",
        "9": "You Clicked On 9, this Indicates Kingly honours."
      },
      "Santan Prashna" : {
        "1": "In your previous birth, a brahmin left with you one dhoti, a bronze utensil, 75 gm silver, 5 gm gold, 150 kg rice and 2 mugs in your custody in good faith. Later his wife came to take her material but you did not give. Due to its effect your children do not remain alive. In order to destroy this bad luck you should indulge in charity and noble deeds so that your son remains alive.",
        "2": "In your previous birth you had refused to return the capital of a guest who had kept it in your custody in good faith. Due to this that guest committed suicide by taking poison. Due to this reason you do not have a son. In order to destroy this bad luck, you should serve food every month to 21 guests and 21 persons of your community till you are blessed with a son. Observe fast on every Sunday of Lord Shri Parshvanath and worship guru so that you can be blessed with two daughters and one son. The questioner has a til (black spot) at his private part or below his elbow.",
        "3": "In your previous birth you had gone to the forest for hunting. At that time you killed a pregnant female deer. Due to this reason your children do not survive. For destruction of this bad luck get one deer and her child made of gold and give it to a poor noble brahmin on the day Maagh Shukla Poonam (Full moon). Offer food to noble person so that your children remain alive.",
        "4": "In your previous birth you were an employee of the king and were very proud. You had broken the boundary of a farmer's field. Due to this reason your children die. For destruction of this bad luck donate 45 gm silver to a brahmin. Give wooden sandals to a saint. Worship holy Jindatt ji Suri or Shri Kushal suri, give clothes-utensils etc to saints and worship guru. Donate money to saints for one year on every chaturdashi (fourteenth day of fortnight). By this method your four sons and two daughters will remain alive.",
        "5": "In your previous birth you had put a false blame on a saint for which he had committed suicide. Due to this reason you have many diseases and your children do not remain alive. Either you do not get children or if you get them, they die. For destruction of this bad luck donate 50 gm gold and 50 gm silver to a noble and poor brahmin. Observe fast on Sundays or on the day of new moon (amavasya). After completion of fasts distribute 108 coconuts to members of your community, worship gods and saints. By this noble deed your children will survive.",
        "6": "In previous birth you were two wives of one man. The younger wife killed the son of elder wife by poison. Due to this reason your children do not remain alive. In order to destroy this bad luck give food, clothes etc to 7, 9, or 51 children of your community. Worship family goddess and arrange rituals in her honor. Worship gods, light butter lamp. Worship holy books. By these noble deeds you will have two sons and three daughters.",
        "7": "In your previous birth you were daughter of a businessman. You were very proud. You had snatched the wealth of a man by betrayal. That man died due to grief caused by loss of money. Due to this reason you do not have children in this birth. For destruction of this bad luck donate 50 gm silver and a colored cow in a proper manner to a noble and poor brahmin. Listen Bhaktamar stotra along with your spouse for 44 days. Do other religious rituals as well. By these noble deeds your children will survive. All your problems, disease etc will disappear. Your health will be good, children will live.",
        "8": "In previous birth you were a lady of lower class. At that time you did many evil acts and swindled others. Due to this reason you remain ill and have fever. You suffer many agonies. For destruction of this bad luck offer food to saints and members of your community on ekadashi (11th day of fortnight). Serve food to 25 religious students and 25 guests as relished by them and arrange in totality for their religious studies. By this noble deed you will remain free of disease. The hurdles in getting a child will be removed. Two sons and one daughter will survive.",
        "9": "In your previous birth, you were a rajput lady. Whomsoever will come to you, you will torture him by arousing his greed. Due to this evil act you have blood disease. You also do not get children. For destruction of this bad luck observe fast for 5 years on new moon (amavasya). After completion of this ritual offer clothes to a noble brahmin lady. The hurdles of children will disappear. You will have one daughter and two sons.",
        "10": "In your previous birth you were living in the country Medpat along with two brothers and three sisters. One day you hit a cow by stone so strongly that she died. Due to this slaughter your son does not survive. For destruction of this bad luck, observe fast for 5 years on Rishi Panchami (Bhadrapad Panchmi of shukla paksh). Indulge in worship and study of religious books. By its influence your two sons and one daughter will survive.",
        "11": "In your previous birth you were resident of the country Marudhar. You did intercourse with your daughter who became pregnant and miserable. Due to this reason there is disease in your uterus and eyes are weak. For destruction of this evil you should do tapasya (mortification) and worship guru. By its effect your problems will go and there will be birth of a son and daughter.",
        "12": "The whole blame is on your bad luck; no one else is the culprit. Earlier you got a son but not now. Worship lord Parshvanath, Vardhman and Shantinath ji that will give you all round bliss. Attach yourself with saints and members of your community. Arrange worship in the temple and serve guru."
      },
      "Ramal Shakunavli" : {
          "Lahiyan": "The work that you have thought will be accomplished. You have remained worried for a long time, now your worry will go away. You will hear news of happiness. You will see indications of your success on Sunday. Welfare is likely in seven days. The lost thing will come back safely. The money and affairs will render success. Enemies will perish. A man desires your harm; he will be defeated. You will develop relations with a gentleman that will be helpful. You will have victory now.",
          "Kabjul Kharij": "The work that you have decided will not materialize. Keep patience for few days; success will be achieved after delays. You have thought of marriage, theft, journey, job or meeting someone, these will not be successful for the time being. The lost thing is towards south. Welfare is likely after 19 days. Success will follow later on.",
          "Farah": "The work related to your query will be accomplished soon. Don't worry. Your desire will be fulfilled; worry and hardships will go away. A man is after you; don't trust him. You will get honours from state. Enemy will be destroyed. The good news will come all of a sudden. A man is envious of you; he will be defeated. You will win.",
          "Ankees": "The work that you have decided will be accomplished after delays. Wherever you wish to go, go after few days. The patient has great agony. The prisoner will be freed immediately. The lost thing will be recovered after difficulties. Good period will come after 36 days. Don't tell your mind's thoughts to anyone. There is one man whom you should not trust. In return of help he tries to cause harm. One day you have seen a bad dream. In the end you will be happy. If you wish to do farming do it yourself. If you wish to have a relationship with someone, don't reveal him your mind's thoughts. Whatever you do, do it with patience and after careful thinking.",
          "Byaz": "Work will be accomplished soon. Worries will go. There will be some sudden gain. Lost thing will be recovered. Marriage etc will render happiness. You will get materials. You have seen a woman in dream on Wednesday. That will give benefits.",
          "Nasrul Dakil": "This omen will render happiness. The work you will plan will be accomplished soon. Your desire will be fulfilled. Develop affection with someone. Go to royal court. The patient will be cured. The farming will give good crop. The enemies will be defeated. The lost thing has gone towards East, which will be recovered. You will get news in one or two days. A man is trying to befriend you, don't trust him. Your worries about son will go away. Welfare is likely after 2 days. Remain assured.",
          "Jaki Ankhad": "The work that you have thought will materialize in four days. The patient is suffering, do some charity, it will be good. Buying and selling of trade should be done after careful analysis. One man is trying to cause harm to you he will suffer himself. The farming is beneficial in north. Spend money in charity. Worship your gods and guru. It will be beneficial.",
          "AjatMai": "The work that you have planned is simple; it will materialize. The patient is suffering; relief will be after delays. The business will render profits. The lost thing will be recovered after delay. Do farming in west. If you wish to travel; go towards west. Keep patience for four days. One man is your enemy; he will be fulfilled in one month. You will get favourable result on Thursday.",
          "Kabjul dakhal": "Be informed, this omen is good. You will have a son definitely. Your worries will leave now. News of joys will come. Days of anxiety are over. You will get a metallic thing. The lost thing is present in southern direction. The suffering that you have encountered will be wiped out. Don't go to west on journey otherwise you will suffer loss. Problems are there till Sunday and good days afterwards. A man will try to befriend you; don't trust him. He criticizes you at your back. He will be destroyed himself. Don't tell your mind's thoughts to anyone. You will see a woman in dream. Your worry will go away. Work will be successful. Remain assured good days are ahead.",
          "Jamait": "You are worried. The work that you have planned may or may not materialise. The lost thing can be recovered by efforts. You will benefit from south. If some one is ill or news is expected, you wish to do farming or trade, do after 15 days. Later on you will have good days. You will have good time after 10 days. A man is jealous of you. He meets you and after wards reveals your secrets to others. He desires to cause harm to you but you have religion as your friend. No one will be able to cause harm to you. The enemy will be destroyed. Remain assured. The planned work will be successful. You will see a dream on Friday, think over it. Worship your gods and guru that will be beneficial.",
          "Uklah": "The work that you have decided will give troubles. You will not get anything. Keep patience in treatment of illness or in going on long journey or in farming. The stolen thing will be found in South. The income will be by hardships. The passenger will come back safely after delay. All your actions should be after proper analysis. The results are normal.",
          "Hamrah": "Your mind has gone astray for last few days. You quarrel with seniors, Keep patience for few days, the sick person will have agony for 3-4 days. Happiness comes after few days. Whatever you wish to do, do after thinking carefully. Do work after consulting your brothers. One man is your enemy. He is medium complexioned you will hear good news by Monday. If you wish to go anywhere, go after considering all aspects. Go towards West you might have purchased an article. If not, purchase something. Profits are likely after seven days. You will meet a man; he will try to befriend you but don't trust him. If you wish to do farming, do. The differences at home will vanish, you will be happy. Worship your favourite god. Don't reveal your mind's ideas to anyone.",
          "Nasrul khariz": "The omen is of victory. The work that you have thought will be accomplished soon. There will be happiness all of a sudden. Your business will prosper. You will enter into a partnership. The lost thing will be recovered. The patient will recover. Trading will be beneficial. Good news is expected by Sunday. The farming is profitable. Go to royal court, you will win. You will see a dream on Sunday. A man is your enemy; he will be defeated. Your gods are great, their worship is rewarding. Wherever you go, victory is yours. You will win in court and disputes. There is a tall man, don't trust him. He is bad. Your worry will vanish.",
          "Utbul khariz": "The work that you have planned, do it. The patient has pain for 10 days; get him treated. The lost or stolen thing will not be recovered, if regained it will be after great hard ships. The person whom you love is noble. A man criticizes you; remain alert. Do buying and selling in trade. Do work after 10 days. One man is powerful; remain humble before him. Agriculture is good in Eastern side. Good days are ahead",
          "Utbul dakhil": "The omen is for victory, your desire will be fulfilled. The worry of child will go away. You will win in conflict. The work in business or job will materialize. Buy cattle, you will have profits. The enemy will be destroyed. Maintain affection and good manners, it will be good. You will have sudden gains.",
          "Tareek": "The omen is very good. The work that is keeping you worried will materialize soon. The stolen article will be recovered soon. You will win in conflict or in court. Business will render profits. The enemy tries to cause harm; he will himself get defeated. Your work will definitely be accomplished. One man is envious of you; he will suffer himself. The patient will get cured. Agriculture is profitable. Buying and selling of cattle will be beneficial. Develop friendship with one man. He will be helpful. Days of worry have gone; good days have come. You will have sudden gains. The person who has gone to distant place is safe. Now your luck will be good. Bliss will increase always. Don't reveal ideas of your mind to anyone. Your fame will increase. Good days are in the offing."
      },
      "Sagar Chakra" : {
          ",n": "Learning, wealth, bliss, love from spouse, profits.",
          "Th": "Grief, sorrows, excess calamity, trouble, excessive danger.",
          "S": "Loss, increase of enemies, grief, sorrows.",
          "J": "Loss of money, failure in venture, conflicts.",
          "Kh": "Success in work, gain of state, fame and gain of luxuries.",
          "En": "Gain of money, receipt of knowledge, profit in work alertness, happiness.",
          "Pha": "Success in work, bliss of wealth, destruction of perils.",
          "Grief": "Grief - sorrows, opposition from relations, disbelief, disease and peril.",
          "Thr": "Success, opposition from friends, good health, pleasures of state.",
          "/ Chha": "Gain of wealth, family bliss, success in efforts.",
          "N": "Victory, profits, state honors, gain of wealth, welfare.",
          "?": "Profits, long life, gain in luxuries by pradosh vrat (Fast).",
          "Bha": "Success, honors, happiness, good health.",
          "Rin": "Gain of money, success, happiness everywhere, good luck.",
          "Un": "Gain of money, welfare, fame, success in work.",
          "|": "Profits, worries, fulfillment of desires, happiness.",
          "An": "Reunion with friends, success in venture, honor, bliss and instability.",
          "/ V": "Success, receipt of desired thing, prestige, increase in fame.",
          "Ta": "Profits, gain of precious stones, joys, welfare, good health.",
          ",": "Failure, worry, grief, journey to foreign land, loss of wealth, prosecution.",
          "Ka": "Failure, loss, incomplete plan and instability.",
          "A": "Desired results, prestige, affection with brothers.",
          "Tn": "Loss, anguish, unemployed, failure.",
          "Thha": "Birth of son, success by going elsewhere, increase of luck at home.",
          "Air": "Grave disease, worry, sorrows, peril, gain of friend, success after delay.",
          "Chn": "State honors, receipt of desired thing, profits, welfare.",
          "Chandra": "Loss in business, opposition by friends, conflicts.",
          "'": "Success, bliss of spouse, good health, increase in gallantry.",
          "Mn": "Success, gain of wealth, intercourse, worry.",
          "U": "Success is certain in work, achievement of targets.",
          "Ai": "Defense, content, success in contemplated work.",
          "Bn": "Medium result, failure, opposition from friends.",
          "Ba": "Sure success, true affection, benefits of all types.",
          "Fha": "Grief, sorrow, loss of money, failure, conflicts, opposition.",
          "G": "Profits, receipt of gold, good luck, success in ventures.",
          "Rishi": "Profits, state honor, destruction of disease and of grief.",
          "E": "Success in all spheres, reunion with friends, profits.",
          "Da": "Permanent worry, loss of money, destruction of splendor.",
          "Ja": "Gain of all types of wealth, esteem, knowledge, fame, gain of bliss.",
          "K": "Sorrows at home, hurdles, extreme anguish, grief.",
          "P": "Loss in all ventures, diseases, hurdles by enemies.",
          "T": "Birth of son, reunion with relatives and friends, welfare, pleasures, good luck.",
          "L": "Grief, prosecution, success in evil deeds.",
          "Ri": "Success in work, progress in all spheres, auspicious, luxuries, good luck. Beloved of all.",
          "H": "Victory, bliss, wealth, reunion with dear one.",
          "B": "Profits, increase in wealth, success.",
          "M": "Bath, food, prestige, profits, success in venture.",
          "Gy": "Success in work, company of noble people, zest, pilgrimages, good news, reunion, progress.",
          "Aii": "Success everywhere, fulfillment of desires, bliss, birth of a child.",
          "R": "Loss, hurdles, extreme anguish, grief, prosecution.",
          ".": "Conflicts, loss of money, opposition by spouse, bitterness with friends.",
          "I": "Success, increase in wealth and fame, gain of money.",
          "Ch": "Good food, good luck, success is certain in work."
      }
};

const Puratan = () => {
  const [selectedPrasnawali, setSelectedPrasnawali] = useState("");
  const [selectedButton, setSelectedButton] = useState("");
  const [prediction, setPrediction] = useState("");
  const navigation = useNavigation();

  const handlePrasnawaliChange = (itemValue) => {
    setSelectedPrasnawali(itemValue);
    setSelectedButton("");
    setPrediction("");
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    const predictions = prasnawaliData[selectedPrasnawali];
    if (predictions) {
      setPrediction(predictions[buttonName]);
    }
  };

  const renderButtons = () => {
    const prasnawali = prasnawaliData[selectedPrasnawali];
    if (!prasnawali) return null;

    const buttons = Object.keys(prasnawali).map(key => (
      <TouchableOpacity
        key={key}
        style={styles.button}
        onPress={() => handleButtonClick(key)}
      >
        <Text style={styles.buttonText}>{key}</Text>
      </TouchableOpacity>
    ));

    const column = [];
    for (let i = 0; i < buttons.length; i += 5) {
      column.push(
        <View key={i} style={styles.buttonRow}>
          {buttons.slice(i, i + 5)}
        </View>
      );
    }

    return <View style={styles.buttonGrid}>{column}</View>;
  };

  return (
    <>
    <Siri />
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.buttonname}>
          <Text style={styles.buttonTextname}>Prasnawali</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('kaudi')} style={styles.buttonname}>
          <Text style={styles.buttonTextname}>Kaudi</Text>
        </TouchableOpacity>
      </View>

      <Picker
        selectedValue={selectedPrasnawali}
        onValueChange={handlePrasnawaliChange}
        style={styles.picker}
      >
        <Picker.Item label="Select Prasnawali" value="" />
        {Object.keys(prasnawaliData).map(key => (
          <Picker.Item key={key} label={key} value={key} />
        ))}
      </Picker>

      <View style={styles.buttonGrid}>
        {renderButtons()}
      </View>

      {prediction && (
        <View style={styles.predictionBox}>
          <Text style={styles.predictionTitle}>Prediction:</Text>
          <Text>{prediction}</Text>
        </View>
      )}
    </ScrollView>
    <CustomBottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
    paddingBottom: 80,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  buttonname: {
    backgroundColor: '#f0f0f0',
    width: '40%', // Adjusted to 20%
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'black',
    width: '20%', // Adjusted to 20%
    padding: 10,
    borderRadius: 5,
  },
  buttonTextname: {
    color: 'black',
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  buttonGrid: {
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  predictionBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  predictionTitle: {
    fontWeight: 'bold',
  },
});

export default Puratan;
