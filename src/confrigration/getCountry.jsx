import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Country } from "../services/constants";
const Get_Country = () => {
  const dispatch = useDispatch();



  const locations = [
    {
      location_name: 'Afghanistan',
      location_code: 2004
    },
    {
      location_name: 'Albania',
      location_code: 2008

    },
    {
      location_name: 'Antarctica',
      location_code: 2010
    },
    {
      location_name: 'Algeria',
      location_code: 2012
    },
    {
      location_name: 'American Samoa',
      location_code: 2016
    },
    {
      location_name: 'Andorra',
      location_code: 2020
    },
    {
      location_name: 'Angola',
      location_code: 2024
    },
    {
      location_name: 'Antigua and Barbuda',
      location_code: 2028
    },
    {
      location_name: 'Azerbaijan',
      location_code: 2031
    },
    {
      location_name: 'Argentina',
      location_code: 2032
    },
    {
      location_name: 'Australia',
      location_code: 2036
    },
    {
      location_name: 'Austria',
      location_code: 2040
    },
    {
      location_name: 'The Bahamas',
      location_code: 2044
    },
    {
      location_name: 'Bahrain',
      location_code: 2048
    },
    {
      location_name: 'Bangladesh',
      location_code: 2050
    },
    {
      location_name: 'Armenia',
      location_code: 2051
    },
    {
      location_name: 'Barbados',
      location_code: 2052
    },
    {
      location_name: 'Belgium',
      location_code: 2056
    },
    {
      location_name: 'Bhutan',
      location_code: 2064
    },
    {
      location_name: 'Bolivia',
      location_code: 2068
    },
    {
      location_name: 'Bosnia and Herzegovina',
      location_code: 2070
    },
    {
      location_name: 'Botswana',
      location_code: 2072
    },
    {
      location_name: 'Brazil',
      location_code: 2076
    },
    {
      location_name: 'Belize',
      location_code: 2084
    },
    {
      location_name: 'Solomon Islands',
      location_code: 2090
    },
    {
      location_name: 'Brunei',
      location_code: 2096
    },
    {
      location_name: 'Bulgaria',
      location_code: 2100
    },
    {
      location_name: 'Myanmar (Burma)',
      location_code: 2104
    },
    {
      location_name: 'Burundi',
      location_code: 2108
    },
    {
      location_name: 'Cambodia',
      location_code: 2116
    },
    {
      location_name: 'Cameroon',
      location_code: 2120
    },
    {
      location_name: 'Canada',
      location_code: 2124
    },
    {
      location_name: 'Cape Verde',
      location_code: 2132
    },
    {
      location_name: 'Central African Republic',
      location_code: 2140
    },
    {
      location_name: 'Sri Lanka',
      location_code: 2144
    },
    {
      location_name: 'Chad',
      location_code: 2148
    },
    {
      location_name: 'Chile',
      location_code: 2152
    },
    {
      location_name: 'China',
      location_code: 2156
    },
    {
      location_name: 'Christmas Island',
      location_code: 2162
    },
    {
      location_name: 'Cocos (Keeling) Islands',
      location_code: 2166
    },
    {
      location_name: 'Colombia',
      location_code: 2170
    },
    {
      location_name: 'Comoros',
      location_code: 2174
    },
    {
      location_name: 'Republic of the Congo',
      location_code: 2178
    },
    {
      location_name: 'Democratic Republic of the Congo',
      location_code: 2180
    },
    {
      location_name: 'Cook Islands',
      location_code: 2184
    },
    {
      location_name: 'Costa Rica',
      location_code: 2188
    },
    {
      location_name: 'Croatia',
      location_code: 2191
    },
    {
      location_name: 'Cyprus',
      location_code: 2196
    },
    {
      location_name: 'Czechia',
      location_code: 2203
    },
    {
      location_name: 'Benin',
      location_code: 2204
    },
    {
      location_name: 'Denmark',
      location_code: 2208
    },
    {
      location_name: 'Dominica',
      location_code: 2212
    },
    {
      location_name: 'Dominican Republic',
      location_code: 2214
    },
    {
      location_name: 'Ecuador',
      location_code: 2218
    },
    {
      location_name: 'El Salvador',
      location_code: 2222
    },
    {
      location_name: 'Equatorial Guinea',
      location_code: 2226
    },
    {
      location_name: 'Ethiopia',
      location_code: 2231
    },
    {
      location_name: 'Eritrea',
      location_code: 2232
    },
    {
      location_name: 'Estonia',
      location_code: 2233
    },
    {
      location_name: 'South Georgia and the South Sandwich Islands',
      location_code: 2239
    },
    {
      location_name: 'Fiji',
      location_code: 2242
    },
    {
      location_name: 'Finland',
      location_code: 2246
    },
    {
      location_name: 'France',
      location_code: 2250
    },
    {
      location_name: 'French Polynesia',
      location_code: 2258
    },
    {
      location_name: 'French Southern and Antarctic Lands',
      location_code: 2260
    },
    {
      location_name: 'Djibouti',
      location_code: 2262
    },
    {
      location_name: 'Gabon',
      location_code: 2266
    },
    {
      location_name: 'Georgia',
      location_code: 2268
    },
    {
      location_name: 'The Gambia',
      location_code: 2270
    },
    {
      location_name: 'Germany',
      location_code: 2276
    },
    {
      location_name: 'Ghana',
      location_code: 2288
    },
    {
      location_name: 'kiribati',
      location_code: 2296
    },
    {
      location_name: 'greece',
      location_code: 2300
    },
    {
      location_name: 'grenada',
      location_code: 2308
    },
    {
      location_name: 'guam',
      location_code: 2316
    },
    {
      location_name: 'guatemala',
      location_code: 2320
    },
    {
      location_name: 'guinea',
      location_code: 2324
    },
    {
      location_name: 'guyana',
      location_code: 2328
    },
    {
      location_name: 'haiti',
      location_code: 2332
    },
    {
      location_name: 'vatican city',
      location_code: 2336
    },
    {
      location_name: 'honduras',
      location_code: 2340
    },
    {
      location_name: 'hungary',
      location_code: 2348
    },
    {
      location_name: 'Iceland',
      location_code: 2352
    },
    {
      location_name: 'India',
      location_code: 2356
    },
    {
      location_name: 'Indonesia',
      location_code: 2360
    },
    {
      location_name: 'iraq',
      location_code: 2368
    },
    {
      location_name: 'ireland',
      location_code: 2372
    },
    {
      location_name: 'israel',
      location_code: 2376
    },
    {
      location_name: 'italy',
      location_code: 2380
    },
    {
      location_name: 'jamaica',
      location_code: 2388
    },
    {
      location_name: 'japan',
      location_code: 2392
    },
    {
      location_name: 'kazakhstan',
      location_code: 2398
    },
    {
      location_name: 'jordan',
      location_code: 2400
    },
    {
      location_name: 'kenya',
      location_code: 2404
    },
    {
      location_name: 'south korea',
      location_code: 2410
    },
    {
      location_name: 'kuwait',
      location_code: 2414
    },
    {
      location_name: 'kyrgyzstan',
      location_code: 2417
    },
    {
      location_name: 'laos',
      location_code: 2418
    },
    {
      location_name: 'lebanon',
      location_code: 2422
    },
    {
      location_name: 'lesotho',
      location_code: 2426
    },
    {
      location_name: 'latvia',
      location_code: 2428
    },
    {
      location_name: 'liberia',
      location_code: 2430
    },
    {
      location_name: 'libya',
      location_code: 2434
    },
    {
      location_name: 'liechtenstein',
      location_code: 2438
    },
    {
      location_name: 'lithuania',
      location_code: 2440
    },
    {
      location_name: 'malaysia',
      location_code: 2458
    },
    {
      location_name: 'maldives',
      location_code: 2462
    },
    {
      location_name: 'mali',
      location_code: 2466
    },
    {
      location_name: 'malta',
      location_code: 2470
    },
    {
      location_name: 'mauritius',
      location_code: 2480
    },
    {
      location_name: 'mexico',
      location_code: 2484
    },
    {
      location_name: 'monaco',
      location_code: 2492
    },
    {
      location_name: 'mongolia',
      location_code: 2496
    },
    {
      location_name: 'morocco',
      location_code: 2504
    },
    {
      location_name: 'oman',
      location_code: 2512
    },
    {
      location_name: 'namibia',
      location_code: 2516
    },
    {
      location_name: 'nepal',
      location_code: 2524
    },
    {
      location_name: 'netherlands',
      location_code: 2528
    },
    {
      location_name: 'new zealand',
      location_code: 2554
    },
    {
      location_name: 'niger',
      location_code: 2562
    },
    {
      location_name: 'nigeria',
      location_code: 2566
    },
    {
      location_name: 'norway',
      location_code: 2578
    },
    {
      location_name: 'United States Monir Otlying Islands',
      location_code: 2581
    },
    {
      location_name: 'palau',
      location_code: 2585
    },
    {
      location_name: 'Pakistan',
      location_code: 2586
    },
    {
      location_name: 'Panama',
      location_code: 2591
    },
    {
      location_name: 'Papua New Guinea',
      location_code: 2598
    },
    {
      location_name: 'Paraguay',
      location_code: 2600
    },
    {
      location_name: 'Peru',
      location_code: 2604
    },
    {
      location_name: 'Phillippines',
      location_code: 2608
    },
    {
      location_name: 'Poland',
      location_code: 2616
    },
    {
      location_name: 'Portugal',
      location_code: 2620
    },
    {
      location_name: 'Qatar',
      location_code: 2634
    },
    {
      location_name: 'Romania',
      location_code: 2642
    },
    {
      location_name: 'Saint Lucia',
      location_code: 2662
    },
    {
      location_name: 'San Marino',
      location_code: 2674
    },
    {
      location_name: 'Saudi Arabia',
      location_code: 2682
    },
    {
      location_name: 'Senegal',
      location_code: 2686
    },
    {
      location_name: 'Serbia',
      location_code: 2688
    },
    {
      location_name: 'Singapore',
      location_code: 2702
    },
    {
      location_name: 'Slovakia',
      location_code: 2703
    },
    {
      location_name: 'Vietnam',
      location_code: 2704
    },
    {
      location_name: 'Slovenia',
      location_code: 2705
    },
    {
      location_name: 'South Africa',
      location_code: 2710
    },
    {
      location_name: 'Zimbabwe',
      location_code: 2716
    },
    {
      location_name: 'Spain',
      location_code: 2724
    },
    {
      location_name: 'Sweden',
      location_code: 2752
    },
    {
      location_name: 'Switzerland',
      location_code: 2756
    },
    {
      location_name: 'Tajikistan',
      location_code: 2762
    },
    {
      location_name: 'Thailand',
      location_code: 2764
    },
    {
      location_name: 'United Arab Emirates',
      location_code: 2784
    },
    {
      location_name: 'Tonga',
      location_code: 2776
    },
    {
      location_name: 'Tunisia',
      location_code: 2788
    },
    {
      location_name: 'Turkey',
      location_code: 2792
    },
    {
      location_name: 'turkmenistan',
      location_code: 2795
    },
    {
      location_name: 'Tuvalu',
      location_code: 2798
    },
    {
      location_name: 'Uganda',
      location_code: 2800
    },
    {
      location_name: 'Ukraine',
      location_code: 2804
    },
    {
      location_name: 'Egypt',
      location_code: 2818
    },
    {
      location_name: 'United Kingdom',
      location_code: 2826
    },
    {
      location_name: 'Jersey',
      location_code: 2832
    },

    {
      location_name: 'tanzania',
      location_code: 2834
    },
    {
      location_name: 'United States',
      location_code: 2840
    },
    {
      location_name: 'Burkina Faso',
      location_code: 2854
    },
    {
      location_name: 'Uruguay',
      location_code: 2858
    },
    {
      location_name: 'Uzbekistan',
      location_code: 2860
    },
    {
      location_name: 'Venezuela',
      location_code: 2862
    },
    {
      location_name: 'Samoa',
      location_code: 2882
    },
    {
      location_name: 'Yemen',
      location_code: 2887
    },
    {
      location_name: 'Zambia',
      location_code: 2894
    },

























































































  ]
    dispatch({ type: "GETCOUNTRY", payload: locations });


  // country Data api start

  // let Headers = {
  //   headers: {
  //     Authorization:
  //       "Basic aW5mb0Blc2VhcmNobG9naXguY29tOmZmOWZiMjY4NDZhMTYwZGI=",
  //   },
  // };

  // axios.get(Country(), Headers).then((res) => {
  //   const country = res.data;
  //   dispatch({ type: "GETCOUNTRY", payload: country });
  // });

  // country Data api end //
};
export default Get_Country;
