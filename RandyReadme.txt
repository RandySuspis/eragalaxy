MASTER DATABASE CRUD ONLY (Stand alone database)
	1. Office (PropertyAgent(BD|MD)) :
		1a. Sek piye cara'e Property Agent butuh office, tapi di sisi lain Office butuh Property Agent (Diakali bisa sih)
	2. User_Role
	3. User
	4. Property_Agent_Level
	5. Pajak
	6. Default_Setting (DefaultMGFee - DefaultBM1 - DefaultBM2 - DefaultMGM1 - DefaultMGM2 )
	7. Log Admin

Database Relational (Database many to many)
	1.

Key Database
	1. PrimaryProject (PropertyAgentLevel-Lister, PropertyAgentLevel-Koor1, PropertyAgentLevel-Koor2)
	2. Property Agent (Office, Property Agent Level - Parent, )
	3. Transaction Commission
		2a. PrimaryTransaction (PrimaryProject(ID, Lister + Koor+ Persen-an), PropertyAgent(Lister, Koor1&2, BM, MGM, Agent'e dewe), Default Setting)
		2b. SecondaryTransaction (PropertyAgent(Agent|BM|MGM), Pajak(PPN-PPH), Default_setting(ManagementFee|BM1|MGM|))
	4. Komisi Cair (TransactionCommission - Property Agent - Date - Termin)
	5. Agent-Commission (ID, ComissionValue, TransactionDate, tipe)
		- Buat Ngitung pajak ama progressive transaction
	6. BLT (Bantuan Langsung Tunai) - (Property Agent)
	7. KPR (Komisi KPR) - (Property Agent)
	8. Report Bulanan() Ben ga ngitung terus pas di request


HALAMAN :
	1. Office(CRUD) - Done
	2. PRopertyAgent(CRUD) - Done
	3. UserAdmin(CRUD) - Done
	4. UserRole(CRUD) - Done
	5. PropertyAgentLevel(CRUD) - (Done)
	6. Pajak(CRUD) - Done
	7. Default Setting(CRUD) - Done
	8. Log Admin(List)

	9. Create New Admin Page
	10. Transaction Secondary
	11. Transaction Primary
	12. Transaction BLT
	13. Transaction KPR

	14. Agent Rekap Laporan - Commmission History
	15. Office Rekap laporan - All Commmission History
	16. Office Rekap laporan - Monthly Commmission History
	17. Best BM Rekap/Monthly Laporan - berdsarkan apa ini? (Komisi ato bonus)
	18. Best PC Rekap/Monthly Laporan - Komisi penjualan pribadi
	19. Best Office Rekap/Monthly Laporan - Komisi Penjualan Office


=====================================================================
| QUESTION Randy: 													|
| 	1. Progressive commission itu kayak pajak PPH tah?				|
|	2. PC kalo naik BM, PC dibawah BM itu pindah ke Punya BM Parent |
|		(Dilihat berdasarkan tanggal, bila transaksi PC sebelum Parent
|		jadi BM, tetep masuk parent'e) - Mau Masuk database Mana??  |
|	3. 																|
=====================================================================


DATABASE :
    OFFICE
    			name string
    			address string
    			phone 1 string
    			phone 2 string
    			email string

    USER
    			email string
    			password string
    			role string
    			last_login timestamps
    			name string

    ROLES (from sentinel)
    			slug
    			name
    			permissions

    PROPERTY_AGENT_LEVEL
    			name string

    PAJAK
    			name string
    			percentage integer

    Default_Setting
    			name string
    			percentage integer

    LOG_ADMIN
    			log_desc string
    			date timestamps

    PRIMARY_PROJECT
    			project_name string
    			agent_id integer
    			percentage integer
    			percent_listing_commission integer
    			percent_selling_commission integer
    			percent_office_selling_commission integer
    			note text
    			Agent_Lister_Id
    			Koor_Id 1
    			Koor_Id 2
    			Koor_Id 3
    			Koor_Id 4

    PROPERTY_AGENT
    			office_id integer
    			agent_id / reg number string
    			agent_level_id integer
    			parent_id integer
    			name string
    			phone string
    			join_date timestamps
    			exit_date timestamps

    COMMISSION
    			transaction_id integer
    			agent_id integer
    			date timestamps
    			termin integer

    COMMISSION_PER_AGENT
    			agent_id integer
    			commission_net integer
    			commission_type string
    			date timestamps

    TAX_PER_AGENT
    			agent_id integer
    			tax_value integer
    			tax_type string
    			date timestamps


    TRANSACTION_COMMISSION
    			0. Agent_id

    			1. Transaction_Number
    			2. Percent_mg_fee
    				2a. Percent_mg_number
    			3. Office_Percent
    				3a. Office_percent_number
    			4. Agent_percent
    				4a. Agent_percent_number
    			5. PPN_Percent
    				5a. PPN_Number

    			6. Agent_PPH_Percent
    				6a. Agent_PPH_Number
    			7. Agent_end_Commission

    			8. Office_Subsidi_Percent
    				8a. Office_Subsidi_Number

    			====== BONUS ======
    			9. MGM_Parent_Bonus_Percent
    				9a. MGM_Parent_Bonus_number
    				9b. MGM_Id
    			10. MGM_Grandparent_Bonus_Percent
    				10a. MGM_Grandparent_Bonus_number
    				10b. MGM_Grandparent_id

    			11. BM_Bonus_Percent
    				11a. BM_Bonus_number
    				11b. BM_Id
    			11. Sister_BM_Bonus_Percent
    				11a. Sister_BM_Bonus_number
    				11b. BM_Id

    			12. MD_Bonus_Percent
    				11a. MD_Bonus_number
    				11b. MD_Id
    			13. BD_Bonus_Percent
    				11a. BD_Bonus_number
    				11b. BD_Id

    			14.

    Primary_Transaction_Commission
    			0a. Property_Id
    			0b. Lister_Commission_percent
    				0b1. Lister_Commission_number
    				0b2. Lister_Commission_id
    			0c. Koor1_Commission_percent
    				0b1. Koor1_Commission_number
    				0b2. Koor1_Commission_id
    			0d. Koor2_Commission_percent
    				0b1. Koor2_Commission_number
    				0b2. Koor2_Commission_id

    			